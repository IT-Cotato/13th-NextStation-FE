import type { ExploreLine } from "@/api/explore";

const supportedExploreLineCodes = new Set(
  Array.from({ length: 9 }, (_, index) => `LINE_${index + 1}`),
);

export const isSupportedExploreLine = (line: ExploreLine) =>
  supportedExploreLineCodes.has(line.code);

export const getDisplayedExploreLines = (lines?: ExploreLine[]) =>
  lines?.filter(isSupportedExploreLine) ?? [];
