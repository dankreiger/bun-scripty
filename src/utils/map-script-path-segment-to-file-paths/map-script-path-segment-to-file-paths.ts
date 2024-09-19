import type { PackageJson } from 'type-fest';
import type { NpmProcessEnv, ScriptPathDictionary } from '../../types';
import { getNpmLifecycleEvent } from '../get-npm-lifecycle-event';
import { handleGetEnvVar } from '../handle-get-env-var';
import { join } from '../join';

export const mapScriptPathSegmentToFilePaths = async <
  const L extends keyof PackageJson['scripts'] | string = string
>() => {
  const { npm_config_local_prefix, npm_lifecycle_event, npm_package_json } =
    new Proxy(process.env, { get: handleGetEnvVar }) as NpmProcessEnv;

  const scriptPathSegment = getNpmLifecycleEvent(npm_lifecycle_event as L);
  const pathSegment = join(npm_config_local_prefix, 'scripts');

  const pkgJSON = await import(npm_package_json);

  return {
    named: join(pathSegment, `${scriptPathSegment}.ts`),
    indexed: join(pathSegment, scriptPathSegment, 'index.ts'),
  } as const satisfies ScriptPathDictionary;
};
