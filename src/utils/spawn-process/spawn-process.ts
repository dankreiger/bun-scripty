import { spawn } from 'bun';

export const spawnProcess = (scriptPath: string) =>
  spawn(['bun', 'run', scriptPath], { stdout: 'pipe', stderr: 'pipe' });
