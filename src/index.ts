import { Command } from "commander";
import { commands } from "./commands";

const program = new Command();

program
  .version("0.0.1")
  .name("templeme")
  .description(
    "CLI for creating your code temples, base structures that should be repeated across the project"
  );

program
  .command("init")
  .description("Create a new templeme folder")
  .action(() => {
    commands.init();
  });

program
  .command("create [name]")
  .description("Create a new templeme")
  .action((templeName: string) => {
    commands.create(templeName);
  });

program
  .command("list")
  .description("Lists all available temples")
  .action((templeName) => {
    commands.list();
  });

program
  .command("copy")
  .option(
    "-d, --dry-run",
    "Dry run, do not create files, just show the output",
    false
  )

  .option("-f, --folder", "Subfolder inside template folder", "")
  .argument("[source]", "Name of your templeme folder, file or git repository")
  .argument("[destination]", "Destination folder, relative to current folder")
  .argument("[name]", "Name of the resource created from the temple")
  .action((templeName, destination, opts) => {
    commands.copy(templeName, destination, opts);
  });

program.parse();
