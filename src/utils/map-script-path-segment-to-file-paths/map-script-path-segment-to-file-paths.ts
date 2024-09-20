import { EnvVarNotDefinedError } from '../../errors';
import type {
  PartialPkgJSON,
  ScriptPathDictionary,
  ScriptPathSegment,
} from '../../types';
import { join } from '../join';

export const mapScriptPathSegmentToFilePaths = async <
  T extends PartialPkgJSON | undefined = undefined
>(
  lifecycleEvent: string
) => {
  const { npm_config_local_prefix, npm_package_json } = Bun.env;

  if (!npm_package_json) {
    throw new EnvVarNotDefinedError('npm_package_json');
  }
  if (!npm_config_local_prefix) {
    throw new EnvVarNotDefinedError('npm_config_local_prefix');
  }

  const pkgJSON: T = await import(npm_package_json);
  if (!pkgJSON) {
    throw new Error('Failed to import package.json');
  }

  const scriptPathSegment = lifecycleEvent.replaceAll(
    /:|_/gi,
    '/'
  ) as ScriptPathSegment<keyof typeof pkgJSON.scripts>;

  const scriptDirectory = pkgJSON.config?.bunScripty?.path ?? 'scripts';

  const pathSegment = join(npm_config_local_prefix, scriptDirectory);

  return {
    named: join(pathSegment, `${scriptPathSegment}.ts`),
    indexed: join(pathSegment, scriptPathSegment, 'index.ts'),
  } as const satisfies ScriptPathDictionary;
};
