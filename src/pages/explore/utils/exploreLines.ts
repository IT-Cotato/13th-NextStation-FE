import type { ExploreLine } from "@/api/explore";

export const isSupportedExploreLineId = (lineId: number) =>
  Number.isInteger(lineId) && lineId >= 1 && lineId <= 9;

export const supportedExploreLines: ExploreLine[] = [
  { id: 1, name: "1호선", code: "LINE_1", hasCourses: false },
  { id: 2, name: "2호선", code: "LINE_2", hasCourses: false },
  { id: 3, name: "3호선", code: "LINE_3", hasCourses: false },
  { id: 4, name: "4호선", code: "LINE_4", hasCourses: false },
  { id: 5, name: "5호선", code: "LINE_5", hasCourses: false },
  { id: 6, name: "6호선", code: "LINE_6", hasCourses: false },
  { id: 7, name: "7호선", code: "LINE_7", hasCourses: false },
  { id: 8, name: "8호선", code: "LINE_8", hasCourses: false },
  { id: 9, name: "9호선", code: "LINE_9", hasCourses: false },
];

export const getDisplayedExploreLines = (lines?: ExploreLine[]) => {
  if (!lines?.length) return supportedExploreLines;

  const linesById = new Map(lines.map((line) => [line.id, line]));
  return supportedExploreLines.map(
    (fallbackLine) => linesById.get(fallbackLine.id) ?? fallbackLine,
  );
};
