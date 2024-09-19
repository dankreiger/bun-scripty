import { BunScriptyError } from './errors';
import {
  getScriptPath,
  mapScriptPathSegmentToFilePaths,
  processStream,
  spawnProcess,
} from './utils';

export async function bunScripty(): Promise<void> {
  try {
    const subprocess = await mapScriptPathSegmentToFilePaths()
      .then(getScriptPath)
      .then(spawnProcess);

    processStream(subprocess.stdout, process.stdout);
    processStream(subprocess.stderr, process.stderr);

    // Wait for the process to exit
    const exitCode = await subprocess.exited;
    console.log(`Process exited with code ${exitCode}`);

    if (exitCode !== 0) {
      throw new BunScriptyError(
        `Process exited with non-zero code: ${exitCode}`,
        'NON_ZERO_EXIT'
      );
    }
  } catch (error) {
    const bunError = BunScriptyError.fromError(error, 'EXECUTION_ERROR');
    bunError.logError();
    process.exit(1);
  }
}
