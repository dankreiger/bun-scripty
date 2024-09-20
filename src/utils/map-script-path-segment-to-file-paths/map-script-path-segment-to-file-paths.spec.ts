import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';
import type { PartialPkgJSON } from '../../types';
import { join } from '../join';
import { mapScriptPathSegmentToFilePaths } from './map-script-path-segment-to-file-paths';

describe('mapScriptPathSegmentToFilePaths', () => {
  const PROJECT_ROOT = Bun.env.npm_config_local_prefix as string;
  const originalEnv = { ...Bun.env };
  const mockPackageJson = (
    content?: PartialPkgJSON & Record<string, unknown>
  ) =>
    mock.module(Bun.env.npm_package_json as string, () => ({
      version: '1.0.0',
      scripts: {
        'test:unit': 'jest',
        ...content?.scripts,
      },
      ...content,
    }));

  const resetEnv = (env: Record<string, string>) => {
    Object.assign(Bun.env, env);
  };

  const expectPaths = (
    scriptSegment: string,
    opts?: { scriptsDirectory: string }
  ) => {
    const { scriptsDirectory = 'scripts' } = opts ?? {};
    return {
      named: join(PROJECT_ROOT, scriptsDirectory, `${scriptSegment}.ts`),
      indexed: join(PROJECT_ROOT, scriptsDirectory, scriptSegment, 'index.ts'),
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
      await mockPackageJson({
        scripts: { [expectedScript]: 'tsc' },
      });
      const result = await mapScriptPathSegmentToFilePaths(lifecycleEvent);
      expect(result).toEqual(expectPaths(expectedScript));
    }
  );

  test("can work from a custom directory when specified in the package.json's 'config' field", async () => {
    const scriptsDirectory = 'tools/scripts';
    resetEnv({
      npm_config_local_prefix: PROJECT_ROOT,
      npm_package_json: `${PROJECT_ROOT}/package.json`,
    });
    await mockPackageJson({
      config: { bunScripty: { path: scriptsDirectory } },
      scripts: { 'test:unit': 'jest' },
    });

    const result = await mapScriptPathSegmentToFilePaths('test:unit');
    expect(result).toEqual(expectPaths('test/unit', { scriptsDirectory }));
  });

  test('throws error when npm_package_json is missing', () => {
    delete Bun.env.npm_package_json;
    expect(() => mapScriptPathSegmentToFilePaths('test:unit')).toThrow(
      "Environment variable 'npm_package_json' is not defined"
    );
  });

  test('throws error when npm_config_local_prefix is missing', async () => {
    resetEnv({
      npm_config_local_prefix: PROJECT_ROOT,
      npm_package_json: `${PROJECT_ROOT}/package.json`,
    });
    await mockPackageJson({
      scripts: { 'test:unit': 'jest' },
    });
    delete Bun.env.npm_config_local_prefix;

    expect(() => mapScriptPathSegmentToFilePaths('test:unit')).toThrow(
      "Environment variable 'npm_config_local_prefix' is not defined"
    );
  });
});
