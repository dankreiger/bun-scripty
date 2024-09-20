import type { StringKeyOf } from 'type-fest';
import type { PartialPkgJSON, ScriptPathSegment } from '../../types';

export const getScriptPathSegment = <
  const R extends PartialPkgJSON = PartialPkgJSON,
  const S extends StringKeyOf<R['scripts']> = StringKeyOf<R['scripts']>
>(
  npmLifecycleEvent: string
) => String(npmLifecycleEvent).replaceAll(/:|_/gi, '/') as ScriptPathSegment<S>;
