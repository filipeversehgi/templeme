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
import clone from "git-clone";
import { join } from "path";
import { cloneFile, getAllFiles, templeMeExists } from "../utils/files";
import { extractRepoName, isGitRepo } from "../utils/git";
import { logger } from "../utils/logger";
import { PLACEHOLDER_VALUE, ROOT_TEMPLE_DIR } from "../utils/opts";

export const copy = (
  source: string,
  destinationFolder: string,
  name: string,
  { folder, dryRun }: { folder: string; dryRun: boolean } = {
    dryRun: false,
    folder: "",
  }
) => {
  _validateInput(source, destinationFolder, name);

  const destination = join(destinationFolder, name);

  const makeCaseDict = (value: string) => ({
    camel: camelCase(value),
    capital: capitalCase(value),
    constant: constantCase(value),
    dot: dotCase(value),
    kebab: kebabCase(value),
    pascal: pascalCase(value),
    pascalSnake: pascalSnakeCase(value),
    lower: sentenceCase(value).toLowerCase(),
    upper: sentenceCase(value).toUpperCase(),
    sentence: sentenceCase(value),
    snake: snakeCase(value),
    train: trainCase(value),
  });

  logger.space();

  const targetName = name;
  const sourceCases = makeCaseDict(PLACEHOLDER_VALUE);
  const targetCases = makeCaseDict(targetName);

  const isGit = isGitRepo(source);

  const templateFolder = isGitRepo(source)
    ? join(ROOT_TEMPLE_DIR, extractRepoName(source), folder)
    : join(ROOT_TEMPLE_DIR, source, folder);

  if (isGit) {
    logger.log("cloning git repository", source, templateFolder);
    clone(source, templateFolder);
  } else {
    templeMeExists(templateFolder);
  }

  logger.log(chalk.bold("source:"), source);
  logger.log(chalk.bold("destination:"), destination);
  logger.log(chalk.bold("target:"), name);

  const templateFiles = getAllFiles(templateFolder);

  logger.log(chalk.bold("quantity of files:"), templateFiles.length);
  logger.space();

  const replaceMap = Object.fromEntries(
    Object.entries(sourceCases).map(([key, sourceText]) => {
      const targetText = (targetCases as any)[key] || "";
      return [sourceText, targetText];
    })
  );

  for (const file of templateFiles) {
    const relativePath = file.replace(templateFolder, ".");
    const destinationPath = join(destination, relativePath);
    console.log({ destinationPath, destination, relativePath });
    cloneFile(file, destinationPath, replaceMap, !!dryRun);
  }

  logger.success(`temple replicated. you're good to go!`);
  logger.space();
};

const _validateInput = (source: string, destination: string, name: string) => {
  if (!source) {
    logger.error(
      chalk.bold(
        "source",
        "is required. Please provide a source folder or git repository with your templeme templates"
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
      "is required. Please provide a name for the resource"
    );
    process.exit(1);
  }
};

const getTargetName = (destination: string) => {
  const parts = destination.split("/");
  if (parts.length > 1) {
    return parts.pop() || "";
  }

  return destination;
};
