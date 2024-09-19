import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';
import type { PartialPkgJSON } from '../../types';
import { join } from '../join';
import { mapScriptPathSegmentToFilePaths } from './map-script-path-segment-to-file-paths';

describe('mapScriptPathSegmentToFilePaths', () => {
  const PROJECT_ROOT = process.env.npm_config_local_prefix as string;
  const originalEnv = { ...process.env };
  const mockPackageJson = (
    content?: PartialPkgJSON & Record<string, unknown>
  ) =>
    mock.module(process.env.npm_package_json as string, () => ({
      version: '1.0.0',
      scripts: {
        'test:unit': 'jest',
        ...content?.scripts,
      },
      ...content,
    }));

  const resetEnv = (env: Record<string, string>) => {
    process.env = { ...originalEnv, ...env };
  };

  const expectPaths = (
    scriptName: string,
    opts?: { scriptsDirectory: string }
  ) => {
    const { scriptsDirectory = 'scripts' } = opts ?? {};
    return {
      named: join(PROJECT_ROOT, scriptsDirectory, `${scriptName}.ts`),
      indexed: join(PROJECT_ROOT, scriptsDirectory, scriptName, 'index.ts'),
    };
  };

  beforeEach(() => {
    resetEnv({
      npm_config_local_prefix: PROJECT_ROOT,
      npm_package_json: `${PROJECT_ROOT}/package.json`,
      npm_lifecycle_event: 'test:unit',
    });
  });

  afterEach(() => {
    mock.restore();
    process.env = originalEnv;
  });

  // test('uses default "scripts" directory when no custom path is specified', async () => {
  //   await mockPackageJson();
  //   const result = await mapScriptPathSegmentToFilePaths();
  //   expect(result).toEqual(expectPaths('test/unit'));
  // });

  test.each([
    {
      lifecycleEvent: 'build',
      expectedScript: 'build',
      desc: 'maps with "_" delimiter',
    },
    {
      lifecycleEvent: 'build:cli',
      expectedScript: 'build/cli',
      desc: 'maps with ":" delimiter',
    },
  ])(
    "$desc to the project's scripts directory",
    async ({ lifecycleEvent, expectedScript }) => {
      resetEnv({
        npm_lifecycle_event: lifecycleEvent,
        npm_package_json: `${PROJECT_ROOT}/package.json`,
        npm_config_local_prefix: PROJECT_ROOT,
      });
      const result = await mapScriptPathSegmentToFilePaths();
      expect(result).toEqual(expectPaths(expectedScript));
    }
  );

  test("can work from a custom directory when specified in the package.json's 'config' field", async () => {
    const scriptsDirectory = 'tools/scripts';
    await mockPackageJson({
      config: { bunScripty: { path: scriptsDirectory } },
      scripts: { 'test:unit': 'jest' },
    });

    const result = await mapScriptPathSegmentToFilePaths();
    expect(result).toEqual(expectPaths('test/unit', { scriptsDirectory }));
  });

  // test('throws error when npm_lifecycle_event is missing', () => {
  //   delete process.env.npm_lifecycle_event;
  //   expect(() => mapScriptPathSegmentToFilePaths()).toThrow(
  //     "Environment variable 'npm_lifecycle_event' is not defined"
  //   );
  // });

  // test('throws error when npm_package_json is missing', () => {
  //   delete process.env.npm_package_json;
  //   expect(() => mapScriptPathSegmentToFilePaths()).toThrow(
  //     "Environment variable 'npm_package_json' is not defined"
  //   );
  // });

  test('throws error when npm_config_local_prefix is missing', () => {
    delete process.env.npm_config_local_prefix;
    expect(() => mapScriptPathSegmentToFilePaths()).toThrow(
      "Environment variable 'npm_config_local_prefix' is not defined"
    );
  });
});
