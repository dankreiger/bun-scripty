import { file } from 'bun';
import type { mapScriptPathSegmentToFilePaths } from '../map-script-path-segment-to-file-paths';

export const getScriptPath = async ({
  named,
  indexed,
}: Awaited<
  ReturnType<typeof mapScriptPathSegmentToFilePaths>
>): Promise<string> => {
  for (const path of [named, indexed]) {
    if (await file(path).exists()) return path;
  }
  throw new Error(`No script file found at ${named} or ${indexed}`);
};
