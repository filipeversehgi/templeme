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
import { cloneFile, getAllFiles, templeItExists } from "../utils/files";
import { extractRepoName, isGitRepo } from "../utils/git";
import { logger } from "../utils/logger";
import { PLACEHOLDER_VALUE, ROOT_TEMPLE_DIR } from "../utils/opts";

export const copy = (
  source: string,
  destination: string,
  { folder, dryRun }: { folder: string; dryRun: boolean } = {
    dryRun: false,
    folder: "",
  }
) => {
  _validateInput(source, destination);

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

  const targetName = getTargetName(destination);
  const sourceCases = makeCaseDict(PLACEHOLDER_VALUE);
  const destinationCases = makeCaseDict(targetName);

  const isGit = isGitRepo(source);

  const templateFolder = isGitRepo(source)
    ? join(ROOT_TEMPLE_DIR, extractRepoName(source), folder)
    : join(ROOT_TEMPLE_DIR, source, folder);

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
    cloneFile(file, destinationPath, replaceMap, !!dryRun);
  }

  logger.success(`temple replicated. you're good to go!`);
  logger.space();
};

const _validateInput = (source: string, destination: string) => {
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
};

const getTargetName = (destination: string) => {
  const parts = destination.split("/");
  if (parts.length > 1) {
    return parts.pop() || "";
  }

  return destination;
};
