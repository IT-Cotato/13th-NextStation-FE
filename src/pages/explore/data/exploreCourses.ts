import { stationsByLine } from "@/mocks/StationByLine";
import type { SubwayLine } from "@/types/subway";
import type { ConceptId } from "./conceptDetails";

export type ExploreSortOption = "전체" | "최신순" | "인기순";

export interface ExploreCourseData {
  id: string;
  conceptId: ConceptId;
  line: SubwayLine;
  stationName: string;
  createdAt: number;
  popularity: number;
}

const conceptIds: ConceptId[] = [
  "stationery",
  "value",
  "culture",
  "nature",
  "rain",
  "neighborhood",
  "books",
  "after-work",
];

export const conceptCourses: ExploreCourseData[] = conceptIds.flatMap(
  (conceptId, conceptIndex) => {
    const line = ((conceptIndex % 9) + 1) as SubwayLine;

    return stationsByLine[`${line}호선`].slice(0, 6).map((stationName, index) => ({
      id: `${conceptId}-${line}-${index}`,
      conceptId,
      line,
      stationName,
      createdAt: Date.UTC(2026, 7, 1 - index),
      popularity: (index * 17 + conceptIndex * 11) % 100,
    }));
  },
);

export const createLineCourses = (
  line: SubwayLine,
  stationNames: string[],
): ExploreCourseData[] =>
  stationNames.map((stationName, index) => ({
    id: `line-${line}-${index}`,
    conceptId: conceptIds[index % conceptIds.length],
    line,
    stationName,
    createdAt: Date.UTC(2026, 7, 1 - index),
    popularity: (index * 37 + line * 13) % 100,
  }));

export const sortExploreCourses = (
  courses: ExploreCourseData[],
  sort: ExploreSortOption,
) => {
  if (sort === "최신순") {
    return [...courses].sort((a, b) => b.createdAt - a.createdAt);
  }

  if (sort === "인기순") {
    return [...courses].sort((a, b) => b.popularity - a.popularity);
  }

  return courses;
};
