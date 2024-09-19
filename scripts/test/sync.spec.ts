import { $ } from 'bun';
import { afterEach, describe, expect, jest, test } from 'bun:test';

describe('Test Scripts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('running bun test:scripts should call the script at scripts/test/sync.ts', async () => {
    const res = (await $`bun test_sync`).stdout.toString();

    expect(res).toContain('Hello from scripts/test/sync.ts');
  });
});
