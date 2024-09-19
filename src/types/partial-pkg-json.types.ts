export type PartialPkgJSON<L extends string> = {
  scripts: Record<L, string>;
};
