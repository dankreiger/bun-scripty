#!/usr/bin/env bun

import { file } from 'bun';
import { mapScriptPathSegmentToFilePaths } from './src/utils';

try {
  const res = await mapScriptPathSegmentToFilePaths();
  const cmds = ['bun', 'run'];
  if (await file(res.named).exists()) {
    cmds.push(res.named);
  } else if (await file(res.indexed).exists()) {
    cmds.push(res.indexed);
  } else {
    throw new Error(`No script file found at ${res.named} or ${res.indexed}`);
  }

  const proc = Bun.spawn(cmds);
  const text = await new Response(proc.stdout).text();
  console.log(text);

  await proc.exited;
} catch (err) {
  console.error(err);
}

export { mapScriptPathSegmentToFilePaths };
