import type { ConceptTour } from "@/api/explore";
import AfterWorkArtwork from "@/assets/explore/concept-after-work.svg?react";
import BooksArtwork from "@/assets/explore/concept-books.svg?react";
import CultureArtwork from "@/assets/explore/concept-culture.svg?react";
import NatureArtwork from "@/assets/explore/concept-nature.svg?react";
import NeighborhoodArtwork from "@/assets/explore/concept-neighborhood.svg?react";
import RainArtwork from "@/assets/explore/concept-rain.svg?react";
import StationeryArtwork from "@/assets/explore/concept-stationery.svg?react";
import ValueArtwork from "@/assets/explore/concept-value.svg?react";
import FeaturedCultureArtwork from "@/assets/explore/featured-concept-culture.svg?react";
import FeaturedStationeryArtwork from "@/assets/explore/featured-concept-stationery.svg?react";
import FeaturedValueArtwork from "@/assets/explore/featured-concept-value.svg?react";

const DEFAULT_COURSE_COUNT = 0;

export interface ConceptTourDesign {
  conceptTourId: number;
  slug: string;
  title: string;
  description: string;
  detailDescription: string;
  Artwork: typeof StationeryArtwork;
  artworkClassName: string;
  detailArtworkClassName: string;
  courseCount: number;
}

export const conceptTours = [
  {
    conceptTourId: 1,
    slug: "stationery",
    title: "문구 투어",
    description: "작은 문구점과 책방을\n찾아가는 코스",
    detailDescription:
      "작은 문구점과 책방을 따라 걷는\n아기자기한 환승여행 코스",
    Artwork: StationeryArtwork,
    artworkClassName: "h-24 w-[100px]",
    detailArtworkClassName: "h-[134px] w-[140px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 2,
    slug: "value",
    title: "가성비 투어",
    description: "돈은 적게, 만족은\n충분한 알뜰 코스",
    detailDescription: "돈은 적게, 만족은 충분한 알뜰 코스",
    Artwork: ValueArtwork,
    artworkClassName: "h-[94px] w-[92px]",
    detailArtworkClassName: "h-[127px] w-[124px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 3,
    slug: "culture",
    title: "문화재 투어",
    description: "서울 속 오래된\n흔적을 만나는 코스",
    detailDescription: "서울 속 오래된 흔적을 만나는 코스",
    Artwork: CultureArtwork,
    artworkClassName: "h-[95px] w-[92px]",
    detailArtworkClassName: "h-[123px] w-[119px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 4,
    slug: "nature",
    title: "자연 속 힐링 투어",
    description: "하천과 공원을 따라\n쉬어가는 코스",
    detailDescription: "하천과 공원을 따라 쉬어가는 코스",
    Artwork: NatureArtwork,
    artworkClassName: "h-24 w-[92px]",
    detailArtworkClassName: "h-[133px] w-32",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 5,
    slug: "rain",
    title: "비 오는 날 투어",
    description: "흐린 날에도 걷기 좋은\n실내 중심 코스",
    detailDescription: "흐린 날에도 걷기 좋은 실내 중심 코스",
    Artwork: RainArtwork,
    artworkClassName: "size-[92px]",
    detailArtworkClassName: "size-[124px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 6,
    slug: "neighborhood",
    title: "동네 탐방 투어",
    description: "익숙하지 않은 골목과\n동네를 만나는 코스",
    detailDescription: "익숙하지 않은 골목과 동네를 만나는 코스",
    Artwork: NeighborhoodArtwork,
    artworkClassName: "size-[92px]",
    detailArtworkClassName: "size-[124px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 7,
    slug: "books",
    title: "전시·서점 투어",
    description: "조용히 보고 머무는\n문화 공간 코스",
    detailDescription: "조용히 보고 머무는 문화 공간 코스",
    Artwork: BooksArtwork,
    artworkClassName: "h-[91px] w-[92px]",
    detailArtworkClassName: "h-[122px] w-[124px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    conceptTourId: 8,
    slug: "after-work",
    title: "퇴근 후 2시간 투어",
    description: "짧게 다녀와도\n기분 전환되는 코스",
    detailDescription: "짧게 다녀와도 기분 전환되는 코스",
    Artwork: AfterWorkArtwork,
    artworkClassName: "h-[94px] w-[92px]",
    detailArtworkClassName: "h-[126px] w-[124px]",
    courseCount: DEFAULT_COURSE_COUNT,
  },
] as const satisfies readonly ConceptTourDesign[];

export const featuredConceptTours = [
  {
    ...conceptTours[0],
    description: "작은 문구점과 책방을 찾아가는 코스",
    Artwork: FeaturedStationeryArtwork,
    artworkClassName: "h-20 w-[97px]",
  },
  {
    ...conceptTours[1],
    description: "돈은 적게, 만족은 충분한 알뜰 코스",
    Artwork: FeaturedValueArtwork,
    artworkClassName: "h-[76px] w-[140px]",
  },
  {
    ...conceptTours[2],
    description: "서울 속 오래된 흔적을 만나는 코스",
    Artwork: FeaturedCultureArtwork,
    artworkClassName: "h-20 w-[97px]",
  },
] as const satisfies readonly ConceptTourDesign[];

export function getConceptTourDesign(conceptTourId: number) {
  return (
    conceptTours.find((tour) => tour.conceptTourId === conceptTourId) ?? null
  );
}

function normalizeConceptText(value: string) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}

function findMatchingConceptTour(
  design: ConceptTourDesign,
  tours: ConceptTour[],
  usedIds: Set<number>,
  matchById = true,
) {
  if (matchById) {
    const byId = tours.find(
      (tour) =>
        !usedIds.has(tour.conceptTourId) &&
        tour.conceptTourId === design.conceptTourId,
    );
    if (byId) return byId;
  }

  const designNames = new Set([
    normalizeConceptText(design.title),
    normalizeConceptText(design.description),
    normalizeConceptText(design.detailDescription),
  ]);

  return (
    tours.find((tour) => {
      if (usedIds.has(tour.conceptTourId)) return false;

      const tourTexts = [
        normalizeConceptText(tour.name),
        normalizeConceptText(tour.description),
      ];

      return tourTexts.some((text) => designNames.has(text));
    }) ?? null
  );
}

export function getConceptTourDesignByData(
  tour: Pick<ConceptTour, "conceptTourId" | "name" | "description">,
  fallbackIndex = 0,
) {
  const matchedById = getConceptTourDesign(tour.conceptTourId);
  if (matchedById) return matchedById;

  const matchedByName =
    conceptTours.find((design) => {
      const designTexts = [
        normalizeConceptText(design.title),
        normalizeConceptText(design.description),
        normalizeConceptText(design.detailDescription),
      ];
      const tourTexts = [
        normalizeConceptText(tour.name),
        normalizeConceptText(tour.description),
      ];

      return tourTexts.some((text) => designTexts.includes(text));
    }) ?? null;

  return matchedByName ?? conceptTours[fallbackIndex % conceptTours.length];
}

export function getDisplayedConceptTours(tours: ConceptTour[] = []) {
  const usedIds = new Set<number>();

  return tours.map((tour, index) => {
    const matchedByName =
      conceptTours.find((design) => {
        if (usedIds.has(design.conceptTourId)) return false;

        return !!findMatchingConceptTour(design, [tour], new Set(), false);
      }) ?? null;

    const matchedById =
      conceptTours.find(
        (design) =>
          !usedIds.has(design.conceptTourId) &&
          design.conceptTourId === tour.conceptTourId,
      ) ?? null;

    const matchedDesign =
      matchedByName ??
      matchedById ??
      conceptTours.find(
        (design) => !usedIds.has(design.conceptTourId),
      ) ??
      conceptTours[index % conceptTours.length];

    usedIds.add(matchedDesign.conceptTourId);

    return { tour, design: matchedDesign };
  });
}
