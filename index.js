#!/usr/bin/env node

import inquirer from 'inquirer'
import { writeFileSync } from 'fs'

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
      message: `${key}:`,
      default: breakpoints[key],
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
  const answers = await inquirer.prompt(prompts)
  Object.assign(breakpoints, answers)

  return breakpoints
}

/**
 * Generates and returns the CSS code for the grid system
 * @param {{base: null, sm: string, md: string, lg: string, xl: string, 2xl: string}} breakpoints
 * @param {number} columns
 * @returns {string}
 */
const getStyles = (breakpoints, columns) => {
  let styles = ''

  styles += ':root { --grid-gap: 1rem }\n'
  styles += `.grid-container { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: var(--grid-gap) }\n`

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
  try {
    writeFileSync('./plaingrid.css', styles)
    console.log('\nYour plaingrid.css is ready to go!')
  } catch (error) {
    console.error(error)
  }
}

/** PROGRAM */
const columns = 12
const breakpoints = await promptBreakpoints()
const styles = getStyles(breakpoints, columns)

writeFile(styles)
