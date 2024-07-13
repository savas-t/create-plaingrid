#!/usr/bin/env node

import inquirer from 'inquirer'
import { writeFileSync, existsSync } from 'fs'

/**
 * Returns an array of prompts, ready for inquirer
 * @param {{base: null, sm: string, md: string, lg: string, xl: string, 2xl: string}} breakpoints
 * @returns {Array<{type: string, name: string, message: string, default: string}>}
 */
const getPrompts = breakpoints => {
  const prompts = []

  for (const key in breakpoints) {
    if (key == 'base') continue

    prompts.push({
      type: 'input',
      name: key,
      message: `${key} (in px):`,
      default: breakpoints[key],
      validate: input => {
        if (!input.endsWith('px')) {
          return 'Value must end with "px"'
        }

        const numericPart = input.slice(0, -2)

        if (isNaN(numericPart) || numericPart.trim() === '') {
          return 'Value must be a numeric value followed by "px"'
        }

        return true
      },
    })
  }

  return prompts
}

/**
 * Defines a set of default breakpoints and prompts the user for custom values
 * @returns {{base: null, sm: string, md: string, lg: string, xl: string, 2xl: string}}
 */
const promptBreakpoints = async () => {
  const breakpoints = {
    base: null,
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }

  const prompts = getPrompts(breakpoints)

  console.log('\nWhat are your breakpoint values? (sm, md, lg, xl, 2xl)\n')
  const answers = await inquirer.prompt(prompts)
  Object.assign(breakpoints, answers)

  return breakpoints
}

/**
 * Prompts the user for the grid gutter value
 * @returns {string}
 */
const promptGutter = async () => {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'gutter',
    message: 'Your grid gutter value (in px or rem):',
    default: '1rem',
    validate: input => {
      const isRem = input.endsWith('rem')
      const isPx = input.endsWith('px')

      if (!isRem && !isPx) {
        return 'Value must end with "rem" or "px"'
      }

      const numericPart = isRem ? input.slice(0, -3) : input.slice(0, -2)

      if (isNaN(numericPart) || numericPart.trim() === '') {
        return 'Value must be a numeric value followed by "rem" or "px"'
      }

      return true
    },
  })

  return answer.gutter
}

/**
 * Generates and returns the CSS code for the grid system
 * @param {{base: null, sm: string, md: string, lg: string, xl: string, 2xl: string}} breakpoints
 * @param {string} gutter
 * @param {number} columns
 * @returns {string}
 */
const getStyles = (breakpoints, gutter, columns) => {
  let styles = ''

  styles += `:root { --grid-gutter: ${gutter} }\n`
  styles += `.grid-container { display: grid; grid-template-columns: repeat(${columns}, 1fr); column-gap: var(--grid-gutter); grid-column-gap: var(--grid-gutter) }\n`

  for (const key in breakpoints) {
    if (key != 'base') {
      styles += `@media (min-width: ${breakpoints[key]}) {\n`
    }

    for (let column = 1; column <= columns; column++) {
      styles += `.grid-item.colspan-${key}-${column} { grid-column-end: span ${column}; }\n`
      styles += `.grid-item.colstart-${key}-${column} { grid-column-start: ${column}; }\n`
    }

    if (key != 'base') {
      styles += '}\n'
    }
  }

  return styles
}

/**
 * Writes CSS code to a plaingrid.css file
 * @param {string} styles
 */
const writeFile = styles => {
  const filePath = './plaingrid.css'

  if (existsSync(filePath)) {
    throw new Error(`Failed to write to ${filePath}: File already exists.`)
  }

  try {
    writeFileSync(filePath, styles)
    console.log(`Your ${filePath} is ready to go!`)
  } catch (error) {
    throw new Error(`Failed to write to ${filePath}: ${error.message}`)
  }
}

/** PROGRAM */

try {
  const columns = 12
  const breakpoints = await promptBreakpoints()
  console.log('\n')

  const gutter = await promptGutter()
  console.log('\n')

  const styles = getStyles(breakpoints, gutter, columns)
  writeFile(styles)
} catch (error) {
  console.error(`${error}`)
}
