export class GetScriptPathError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'GetScriptPathError';

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetScriptPathError);
    }
  }
}
