export class EnvVarNotDefinedError extends Error {
  constructor(varName: string) {
    super(`Environment variable '${varName}' is not defined`);
    this.name = 'EnvVarNotDefinedError';
  }
}
