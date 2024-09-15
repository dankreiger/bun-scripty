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
      entrypoints: ['./index.ts'],
      minify: true,
    } as const satisfies BuildConfig)
);

// --------------------------------------------

const clean = (type: 'pre' | 'post') =>
  type === 'pre'
    ? rm(DIST, { recursive: true, force: true })
    : rm(`${DIST}/types/index.js`);

await clean('pre');
await Promise.all(CONFIG.map(Bun.build));
await clean('post');
