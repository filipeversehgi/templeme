import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  pascalCase,
  pascalSnakeCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from "change-case";
import { writeFileSync } from "node:fs";
import { getTempleDirectory, PLACEHOLDER_VALUE } from "./opts";

export const generateExampleFile = (templeName: string) => {
  const content = `# A Sample File

Every file that you create in this folder will be copied to your final destination when using this \`Temple\`.
Just be sure to use one of the available casings in the file name or the file content, and it will be replaced with the value you provide afterwards.

## Available Casings

- camel: ${camelCase(PLACEHOLDER_VALUE)}
- capital: ${capitalCase(PLACEHOLDER_VALUE)}
- constant: ${constantCase(PLACEHOLDER_VALUE)}
- dot: ${dotCase(PLACEHOLDER_VALUE)}
- kebab: ${kebabCase(PLACEHOLDER_VALUE)}
- pascal: ${pascalCase(PLACEHOLDER_VALUE)}
- pascalSnake: ${pascalSnakeCase(PLACEHOLDER_VALUE)}
- lower: ${sentenceCase(PLACEHOLDER_VALUE).toLowerCase()}
- upper: ${sentenceCase(PLACEHOLDER_VALUE).toUpperCase()}
- sentence: ${sentenceCase(PLACEHOLDER_VALUE)}
- snake: ${snakeCase(PLACEHOLDER_VALUE)}
- train: ${trainCase(PLACEHOLDER_VALUE)}`;

  writeFileSync(`${getTempleDirectory(templeName)}/example-file.md`, content);
};
