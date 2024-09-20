import { EnvVarNotDefinedError } from '../../errors';

type NpmEnvVar =
  | 'npm_config_local_prefix'
  | 'npm_package_json'
  | 'npm_lifecycle_event';

export const extractNpmEnvVars = () => {
  const vars = [
    'npm_config_local_prefix',
    'npm_package_json',
    'npm_lifecycle_event',
  ] as const satisfies readonly NpmEnvVar[];

  let result = {} as Record<NpmEnvVar, string>;
  for (const v of vars) {
    const val = Bun.env[v];
    if (!val) {
      throw new EnvVarNotDefinedError(
        `Environment variable '${v}' is not defined`
      );
    }
    result[v] = val;
  }
  return result;
};
