import { afterEach, describe, expect, jest, test } from 'bun:test';
import { mapScriptPathSegmentToFilePaths } from '../../src/utils';

describe('Test Scripts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('running bun test_sync should call the script at scripts/test/sync.ts', async () => {
    const res = await mapScriptPathSegmentToFilePaths('test_sync');

    expect(res).toEqual({
      named: `${process.cwd()}/scripts/test/sync.ts`,
      indexed: `${process.cwd()}/scripts/test/sync/index.ts`,
    });
  });
});
