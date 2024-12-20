import { generateExampleFile } from "../utils/example-file";
import { createFolder } from "../utils/files";
import { logger } from "../utils/logger";
import { getTempleDirectory, ROOT_TEMPLE_DIR } from "../utils/opts";

export const create = (templeName: string) => {
  createFolder(getTempleDirectory(templeName));
  generateExampleFile(templeName);
  logger.log(
    `${templeName} created. Edit it at ${ROOT_TEMPLE_DIR}/${templeName}`
  );
};
