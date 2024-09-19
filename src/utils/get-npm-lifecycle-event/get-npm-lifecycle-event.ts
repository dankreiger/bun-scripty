import type { PackageJson } from 'type-fest';
import type { ScriptPathSegment } from '../../types';

export const getNpmLifecycleEvent = <
  const L extends keyof PackageJson['scripts'] | string = string
>(
  npmLifecycleEvent: L
) =>
  npmLifecycleEvent.replaceAll(':', '/') as ScriptPathSegment<
    typeof npmLifecycleEvent
  >;
