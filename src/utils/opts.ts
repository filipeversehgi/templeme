import { kebabCase } from "change-case";
import { logger } from "./logger";

export const parseOpts = (options: Record<string, string>, args: string[]) => {
  const [source, destination, name] = args;
  const { templateString, dryRun, folder } = options;

  if (templateString !== kebabCase(templateString)) {
    logger.error("templateString must be kebab-case");
    process.exit(1);
  }

  return {
    source,
    destination,
    name,
    templateString,
    dryRun: !!dryRun,
    folder,
  };
};
