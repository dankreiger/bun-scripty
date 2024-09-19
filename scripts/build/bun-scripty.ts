import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';
import { rm } from 'node:fs/promises';

const DIST = './dist';

const CONFIG = (
  [
    {
      target: 'bun',
      outdir: `${DIST}/esm`,
      plugins: [],
    },
    {
      target: 'node',
      outdir: `${DIST}/cjs`,
      plugins: [],
    },
    {
      target: 'browser',
      outdir: `${DIST}/browser`,
      plugins: [],
    },
    {
      target: undefined,
      outdir: `${DIST}/types`,
      plugins: [dts()],
    },
  ] as const satisfies Partial<BuildConfig>[]
).map(
  (item) =>
    ({
      ...item,
      entrypoints: ['./bun-scripty.ts'],
      minify: true,
    } as const satisfies BuildConfig)
);

// --------------------------------------------

await rm(DIST, { recursive: true, force: true });
await Promise.all(CONFIG.map(Bun.build));
