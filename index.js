#!/usr/bin/env node

import inquirer from "inquirer";
import { writeFileSync } from "fs";

/* BASE VARIABLES */

const numberOfColumns = 12;
const breakpoints = {
  base: null,
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/* LET USER CHOOSE BREAKPOINTS */

const questions = [];
for (const key in breakpoints) {
  if (key == "base") continue;

  questions.push({
    type: "input",
    name: key,
    message: `${key}:`,
    default: breakpoints[key],
  });
}

const answers = await inquirer.prompt(questions);

Object.assign(breakpoints, answers);

/* GENERATE CSS CLASSES */

let fileContent = "";

// Add grid gap variable and grid-container class
fileContent += ":root { --grid-gap: 1rem }\n";
fileContent += `.grid-container { display: grid; grid-template-columns: repeat(${numberOfColumns}, 1fr); gap: var(--grid-gap) }\n`;

for (const key in breakpoints) {
  if (key != "base")
    fileContent += `@media (min-width: ${breakpoints[key]}) {\n`;

  for (let column = 1; column <= numberOfColumns; column++) {
    // Add colspan and colstart classes
    fileContent += `.grid-item.colspan-${key}-${column} { grid-column-end: span ${column}; }\n`;
    fileContent += `.grid-item.colstart-${key}-${column} { grid-column-start: ${column}; }\n`;
  }

  if (key != "base") fileContent += "}\n";
}

/* WRITE CLASSES TO FILE */

try {
  writeFileSync("./plaingrid.css", fileContent);
  console.log("\nYour plaingrid.css is ready to go!");
} catch (error) {
  console.error(error);
}
