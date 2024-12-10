import { logger } from "./logger";

export const isGitRepo = (source: string): boolean => {
  const gitRepoPattern =
    /^(https:\/\/|git@)([^/:]+)[/:]([^/:]+)\/([^/:]+)\.git$/;
  return gitRepoPattern.test(source);
};

export const extractRepoName = (url: string): string => {
  const match = url.match(/([^/]+)\.git$/);
  if (!match) {
    logger.error(`Invalid git repository URL: ${url}`);
    process.exit(1);
  }
  return match[1];
};
