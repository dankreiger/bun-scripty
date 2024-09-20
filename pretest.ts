#!/usr/bin/env bun

import { $ } from 'bun';

if (!Bun.env.CI) {
  console.log('Giving tests newest binary...');
  await $`bun run build`;
} else {
  console.log('Running tests in CI...');
}
