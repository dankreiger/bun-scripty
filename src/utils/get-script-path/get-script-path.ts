import { file } from 'bun';
import { GetScriptPathError } from '../../errors';
import type { mapScriptPathSegmentToFilePaths } from '../map-script-path-segment-to-file-paths';

export const getScriptPath = async ({
  named,
  indexed,
}: Awaited<
  ReturnType<typeof mapScriptPathSegmentToFilePaths>
>): Promise<string> => {
  try {
    for await (const path of [named, indexed]) {
      if (await file(path).exists()) {
        return path;
      }
    }

    throw new GetScriptPathError(
      `No script file found at ${named} or ${indexed}`
    );
  } catch (err) {
    throw new GetScriptPathError('Failed to get script path', err);
  }
};
