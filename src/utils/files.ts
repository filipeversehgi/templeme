import chalk from "chalk";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { logger } from "./logger";

export const templeItExists = (path: string) => {
  const exists = existsSync(path);
  if (!exists) {
    logger.error(`Template not found under ${path} path`);
    process.exit(1);
  }
};

export const getAllFiles = (
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

export const cloneFile = (
  src: string,
  dest: string,
  replaceMap: Record<string, string>,
  dryRun: boolean = false
) => {
  const content = readFileSync(src, "utf8");

  let destination = dest;

  let newContent = content;
  for (const [key, value] of Object.entries(replaceMap)) {
    newContent = newContent.replaceAll(key, value);
    destination = destination.replaceAll(key, value);
  }

  if (dryRun) {
    console.log("-".repeat(process.stdout.columns));
    logger.log(destination);
    console.log("-".repeat(process.stdout.columns));
    console.log(chalk.gray(newContent));
    return;
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
