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
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import clone from "git-clone";
import { dirname, join } from "path";

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
    "temple-value"
  )
  .option("-f, --folder", "Subfolder inside template folder", "")
  .argument("<source>", "Name of your temple-it folder, file or git repository")
  .argument("<destination>", "Destination folder, relative to current folder")
  .argument("<name>", "Name of the resource created from the temple")
  .parse(process.argv);

const options = program.opts();
const args = program.args;
const [source, destination, name] = args;
const { templateString } = options;

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

const logger = {
  space: () => console.log(" "),
  error: (message: string) =>
    console.log(chalk.bgRed(chalk.white(` ERROR `)), chalk.reset(message)),
  log: (...message: any[]) =>
    console.log(
      chalk.bgGray(chalk.white(` TEMPLE_IT `)),
      chalk.reset(...message)
    ),
  success: (...message: any[]) =>
    console.log(
      chalk.bgGreen(chalk.white(` TEMPLE_IT `)),
      chalk.reset(...message)
    ),
};

const templeItExists = (path: string) => {
  const exists = existsSync(path);
  if (!exists) {
    logger.error(`Template not found under ${path} path`);
    process.exit(1);
  }
};

const getAllFiles = (
  dirPath: string,
  arrayOfFiles: string[] = []
): string[] => {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

const cloneFile = (
  src: string,
  dest: string,
  replaceMap: Record<string, string>
) => {
  const content = readFileSync(src, "utf8");

  let destination = dest;

  let newContent = content;
  for (const [key, value] of Object.entries(replaceMap)) {
    newContent = newContent.replaceAll(key, value);
    destination = destination.replaceAll(key, value);
  }

  const destDir = dirname(destination);
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  writeFileSync(destination, newContent, {
    encoding: "utf8",
    flag: "w",
  });
};

const isGitRepo = (source: string): boolean => {
  const gitRepoPattern =
    /^(https:\/\/|git@)([^/:]+)[/:]([^/:]+)\/([^/:]+)\.git$/;
  return gitRepoPattern.test(source);
};

const extractRepoName = (url: string): string => {
  const match = url.match(/([^/]+)\.git$/);
  if (!match) {
    logger.error(`Invalid git repository URL: ${url}`);
    process.exit(1);
  }
  return match[1];
};

logger.space();

const sourceCases = makeCaseDict(templateString);
const destinationCases = makeCaseDict(name);

const isGit = isGitRepo(source);

const templateFolder = isGitRepo(source)
  ? join(templeItFolder, extractRepoName(source), options.folder)
  : join(templeItFolder, source, options.folder);

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
  cloneFile(file, destinationPath, replaceMap);
}

logger.success(`temple replicated. you're good to go!`);

logger.space();
