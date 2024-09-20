import type { PartialPkgJSON, ScriptPathDictionary } from '../../types';
import { extractNpmEnvVars } from '../extract-npm-env-vars';
import { getScriptPathSegment } from '../get-script-path-segment';
import { getScriptsPathDir } from '../get-scripts-path-dir';
import { join } from '../join';

export const mapScriptPathSegmentToFilePaths = async <
  T extends PartialPkgJSON | undefined = undefined
>(
  lifecycleEvent: string
) => {
  const { npm_config_local_prefix: npmConfigLocalPathDir, npm_package_json } =
    extractNpmEnvVars();
  const pkgJSON: T = await import(npm_package_json);
  if (!pkgJSON) {
    throw new Error('Failed to import package.json');
  }

  const scriptPathSegment = getScriptPathSegment(lifecycleEvent);

  const pathSegment = join(
    getScriptsPathDir({ pkgJSON, npmConfigLocalPathDir })
  );

  return {
    named: join(pathSegment, `${scriptPathSegment}.ts`),
    indexed: join(pathSegment, scriptPathSegment, 'index.ts'),
  } as const satisfies ScriptPathDictionary;
};
