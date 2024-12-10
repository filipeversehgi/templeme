import chalk from "chalk";
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
import { Command } from "commander";
import clone from "git-clone";
import { join } from "path";
import { cloneFile, getAllFiles, templeItExists } from "./utils/files";
import { extractRepoName, isGitRepo } from "./utils/git";
import { logger } from "./utils/logger";
import { parseOpts } from "./utils/opts";

const program = new Command();
const templeItFolder = ".temple-it";

program
  .version("0.0.1")
  .name("temple-it")
  .description(
    "CLI for creating your code temples, base structures that should be repeated across the project"
  )
  .option("-d, --dry-run", "Dry run, do not create files, just show the output")
  .option(
    "-t, --template-string",
    "String to be replace inside the temple file",
    "placeholder-value"
  )
  .option("-f, --folder", "Subfolder inside template folder", "")
  .argument("[source]", "Name of your templeit folder, file or git repository")
  .argument("[destination]", "Destination folder, relative to current folder")
  .argument("[name]", "Name of the resource created from the temple")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}

const { templateString, dryRun, folder, source, destination, name } = parseOpts(
  program.opts(),
  program.args
);

if (!source) {
  logger.error(
    chalk.bold(
      "source",
      "is required. Please provide a source folder or git repository with your templeit"
    )
  );
  process.exit(1);
}

if (!destination) {
  logger.error(
    chalk.bold("destination"),
    "is required. Please provide a destination folder"
  );
  process.exit(1);
}

if (!name) {
  logger.error(
    chalk.bold("name"),
    "is required. Please provide a name for the resource to be generated"
  );
  process.exit(1);
}

const makeCaseDict = (value: string) => ({
  camel: camelCase(value),
  capital: capitalCase(value),
  constant: constantCase(value),
  dot: dotCase(value),
  kebab: kebabCase(value),
  pascal: pascalCase(value),
  pascalSnake: pascalSnakeCase(value),
  lower: value.toLowerCase(),
  upper: value.toUpperCase(),
  sentence: sentenceCase(value),
  snake: snakeCase(value),
  train: trainCase(value),
});

logger.space();

const sourceCases = makeCaseDict(templateString);
const destinationCases = makeCaseDict(name);

const isGit = isGitRepo(source);

const templateFolder = isGitRepo(source)
  ? join(templeItFolder, extractRepoName(source), folder)
  : join(templeItFolder, source, folder);

if (isGit) {
  logger.log("cloning git repository", source, templateFolder);
  clone(source, templateFolder);
} else {
  templeItExists(templateFolder);
}

logger.log(chalk.bold("source:"), source);
logger.log(chalk.bold("destination:"), destination);

const templateFiles = getAllFiles(templateFolder);

logger.log(chalk.bold("quantity of files:"), templateFiles.length);
logger.space();

const replaceMap = Object.fromEntries(
  Object.entries(sourceCases).map(([key, sourceText]) => {
    const destinationText = (destinationCases as any)[key] || "";
    return [sourceText, destinationText];
  })
);

for (const file of templateFiles) {
  const relativePath = file.replace(templateFolder, ".");
  const destinationPath = join(destination, relativePath);
  cloneFile(file, destinationPath, replaceMap, dryRun);
}

logger.success(`temple replicated. you're good to go!`);

logger.space();
