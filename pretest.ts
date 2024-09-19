#!/usr/bin/env bun

import { $ } from 'bun';

if (!process.env.CI) {
  console.log('Giving tests newest binary...');
  await $`bun run build`;
  await $`bun link`;
} else {
  console.log('Running tests in CI...');
}
