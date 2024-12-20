import chalk from "chalk";
import { getAllDirectFiles } from "../utils/files";
import { logger } from "../utils/logger";
import { ROOT_TEMPLE_DIR } from "../utils/opts";

export const list = () => {
  logger.space();
  const files = getAllDirectFiles(ROOT_TEMPLE_DIR);
  logger.log(chalk.bold("Available temples:"));
  for (const file of files) {
    console.log(`→ ${file}`);
  }
  logger.space();
};
