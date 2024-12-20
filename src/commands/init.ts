import { createFolder } from "../utils/files";
import { logger } from "../utils/logger";
import { ROOT_TEMPLE_DIR } from "../utils/opts";

export const init = () => {
  createFolder(ROOT_TEMPLE_DIR);
  logger.log(`Code temples folder created at ${ROOT_TEMPLE_DIR}`);
};
