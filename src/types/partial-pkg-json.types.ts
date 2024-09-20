export type PartialPkgJSON = {
  config?: { 'bun-scripty': { path: string } } & Record<string, unknown>;
  scripts: Record<string, string>;
};
