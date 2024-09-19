export class EnvVarNotDefinedError extends Error {
  constructor(varName: string) {
    super(`Environment variable '${varName}' is not defined`);
    this.name = 'EnvVarNotDefinedError';

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EnvVarNotDefinedError);
    }
  }
}
