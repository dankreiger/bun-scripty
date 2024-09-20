import { $ } from 'bun';

await $`bun build --compile cli.ts --outfile bun-scripty --target=bun-darwin-arm64`;
