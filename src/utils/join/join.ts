import { type Join } from 'type-fest';

export const join = <const T extends readonly string[]>(...args: T) =>
  args.join('/').replace(/\/+/g, '/') as Join<T, '/'>;
