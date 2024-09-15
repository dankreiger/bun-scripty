import { type Replace } from 'type-fest';

export type ScriptPathSegment<ScriptName extends string> = Replace<
  ScriptName,
  ':',
  '/',
  { all: true }
>;
