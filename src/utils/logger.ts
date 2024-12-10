import chalk from "chalk";

export const logger = {
  space: () => console.log(" "),
  error: (...message: string[]) =>
    console.log(chalk.bgRed.white(` ERROR `), chalk.reset(...message)),
  log: (...message: any[]) =>
    console.log(chalk.bgGray.white(` TEMPLE_IT `), chalk.reset(...message)),
  success: (...message: any[]) =>
    console.log(chalk.bgGreen.white(` TEMPLE_IT `), chalk.reset(...message)),
};
