export class BunScriptyError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'BunScriptyError';

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BunScriptyError);
    }
  }

  static fromError(error: unknown, code: string): BunScriptyError {
    if (error instanceof Error) {
      return new BunScriptyError(error.message, code, { originalError: error });
    } else if (typeof error === 'string') {
      return new BunScriptyError(error, code);
    } else {
      return new BunScriptyError('An unknown error occurred', code, {
        originalError: error,
      });
    }
  }

  logError(): void {
    console.error(`[${this.code}] ${this.message}`);
    if (this.details) {
      console.error('Additional details:', this.details);
    }
    console.error(this.stack);
  }
}
