import { EnvVarNotDefinedError } from '../../errors';

export const handleGetEnvVar = (target: Record<string, string>, prop: string) =>
  target[prop as keyof typeof process.env] ||
  (() => {
    throw new EnvVarNotDefinedError(prop as string);
  })();
