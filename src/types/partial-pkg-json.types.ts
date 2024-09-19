export type PartialPkgJSON = {
  config?: { bunScripty: { path: string } } & Record<string, unknown>;
  scripts: Record<string, string>;
};
