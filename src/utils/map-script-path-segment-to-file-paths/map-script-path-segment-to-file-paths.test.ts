import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';
import type { PartialPkgJSON } from '../../types';
import { join } from '../join';
import { mapScriptPathSegmentToFilePaths } from './map-script-path-segment-to-file-paths';

describe('mapScriptPathSegmentToFilePaths', () => {
  const PROJECT_ROOT = '/home/project';

  const originalEnv = { ...process.env };

  const mockPackageJson = (
    content?: PartialPkgJSON & Record<string, unknown>
  ) => {
    mock.module(`${PROJECT_ROOT}/package.json`, () => ({
      version: '1.0.0',
      scripts: {
        'test:unit': 'jest',
        ...content?.scripts,
      },
      ...content,
    }));
  };

  beforeEach(() => {
    process.env = {
      npm_config_local_prefix: PROJECT_ROOT,
      npm_package_json: `${PROJECT_ROOT}/package.json`,
      npm_lifecycle_event: 'test:unit',
    };

    mockPackageJson();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const expectPaths = (scriptName: string) => ({
    named: join(PROJECT_ROOT, 'scripts', `${scriptName}.ts`),
    indexed: join(PROJECT_ROOT, 'scripts', scriptName, 'index.ts'),
  });

  test('uses default "scripts" directory when no custom path is specified', async () => {
    const result = await mapScriptPathSegmentToFilePaths();
    expect(result).toEqual(expectPaths('test/unit'));
  });

  test('handles simple script names without colons', async () => {
    process.env.npm_lifecycle_event = 'build';
    mockPackageJson();

    const result = await mapScriptPathSegmentToFilePaths();
    expect(result).toEqual(expectPaths('build'));
  });

  test('throws error when npm_lifecycle_event is missing', async () => {
    delete process.env.npm_lifecycle_event;
    await expect(mapScriptPathSegmentToFilePaths()).rejects.toThrow(
      "Environment variable 'npm_lifecycle_event' is not defined"
    );
  });

  test('throws error when npm_package_json is missing', async () => {
    delete process.env.npm_package_json;
    await expect(mapScriptPathSegmentToFilePaths()).rejects.toThrow(
      "Environment variable 'npm_package_json' is not defined"
    );
  });

  test('throws error when npm_config_local_prefix is missing', async () => {
    delete process.env.npm_config_local_prefix;
    await expect(mapScriptPathSegmentToFilePaths()).rejects.toThrow(
      "Environment variable 'npm_config_local_prefix' is not defined"
    );
  });
});
