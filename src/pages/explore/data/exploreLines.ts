import type { ExploreLine } from "@/api/explore";

export const defaultExploreLines: ExploreLine[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: index + 1,
    name: `${index + 1}호선`,
    code: `LINE_${index + 1}`,
    hasCourses: false,
  }),
);
