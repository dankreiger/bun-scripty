import type { PartialPkgJSON } from '../../types';
import { join } from '../join';

export const getScriptsPathDir = <const T extends PartialPkgJSON>(input: {
  pkgJSON: T;
  npmConfigLocalPathDir: string;
}) => {
  const dir =
    (input.pkgJSON.config?.['bun-scripty']?.path ||
      Bun.env.BUN_SCRIPTY_SCRIPT_PATH) ??
    'scripts';

  return join(input.npmConfigLocalPathDir, dir);
};
