const assets = import.meta.glob("./*", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

export function exploreAsset(fileName: string) {
  const asset = assets[`./${fileName}`];

  if (!asset) {
    throw new Error(`Unknown explore asset: ${fileName}`);
  }

  return asset;
}