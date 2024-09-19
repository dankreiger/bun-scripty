export class PackageJsonNotFoundError extends Error {
  constructor(cause?: unknown) {
    super(
      `Import from path: [${process.env.npm_package_json}] failed. Check the value of process.env.npm_package_json`,
      {
        cause,
      }
    );
    this.name = 'PackageJsonNotFoundError';
  }
}
