import type { PackageJson } from 'type-fest';

export type NpmProcessEnv<
  L extends keyof PackageJson['scripts'] | string = string
> = {
  readonly npm_config_local_prefix: string;
  readonly npm_lifecycle_event: L;
  readonly npm_package_json: string;
};
