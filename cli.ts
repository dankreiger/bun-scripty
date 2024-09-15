#!/usr/bin/env bun

import {
  getScriptPath,
  mapScriptPathSegmentToFilePaths,
  processStream,
  spawnProcess,
} from './src/utils';

try {
  const subprocess = await mapScriptPathSegmentToFilePaths()
    .then(getScriptPath)
    .then(spawnProcess);

  processStream(subprocess.stdout, process.stdout);
  processStream(subprocess.stderr, process.stderr);

  // Wait for the process to exit
  const exitCode = await subprocess.exited;
  console.log(`Process exited with code ${exitCode}`);
} catch (err) {
  console.error(err);
}

export { mapScriptPathSegmentToFilePaths };
