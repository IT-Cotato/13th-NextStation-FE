import type { CSSProperties } from "react";

type ConceptSlug =
  | "stationery"
  | "value"
  | "culture"
  | "nature"
  | "rain"
  | "neighborhood"
  | "books"
  | "after-work";

interface FeaturedConcept {
  description: string;
  iconStyle: CSSProperties;
  stars: Array<{ image: string; style: CSSProperties }>;
}

interface ConceptTour {
  slug: ConceptSlug;
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  detailIcon: string;
  star: string;
  tileStarStyle: CSSProperties;
  tileIconStyle: CSSProperties;
  headerHeight: number;
  starStyle: CSSProperties;
  iconStyle: CSSProperties;
  featured?: FeaturedConcept;
}

export const conceptTours: ConceptTour[] = [
  {
    slug: "stationery",
    title: "문구 투어",
    description: "작은 문구점과 책방을\n찾아가는 코스",
    detailDescription: "작은 문구점과 책방을 따라 걷는\n아기자기한 환승여행 코스",
    image: "/explore/concept-stationery-figma.png",
    detailIcon: "/explore/detail-stationery-icon.png",
    star: "/explore/detail-stationery-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 16, top: 36, width: 89, height: 69 },
    headerHeight: 217,
    starStyle: { right: 24, top: 59, width: 128, height: 127 },
    iconStyle: { right: 41, top: 97, width: 123, height: 96 },
    featured: {
      description: "작은 문구점과 책방을 찾아가는 코스",
      iconStyle: { right: 34, top: 20, width: 75, height: 57 },
      stars: [
        {
          image: "/explore/main-concept-stationery-star.svg",
          style: { right: 14, top: -6, width: 88, height: 88 },
        },
      ],
    },
  },
  {
    slug: "value",
    title: "가성비 투어",
    description: "돈은 적게, 만족은\n충분한 알뜰 코스",
    detailDescription: "돈은 적게, 만족은 충분한 알뜰 코스",
    image: "/explore/concept-value-figma.png",
    detailIcon: "/explore/detail-value-icon.png",
    star: "/explore/detail-value-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 32, width: 70, height: 70 },
    headerHeight: 197,
    starStyle: { right: 24, top: 46, width: 124, height: 124 },
    iconStyle: { right: 51, top: 79, width: 95, height: 94 },
    featured: {
      description: "돈은 적게, 만족은 충분한 알뜰 코스",
      iconStyle: { right: 37, top: 15, width: 57, height: 57 },
      stars: [
        {
          image: "/explore/main-concept-value-star.svg",
          style: { right: 74, top: 23, width: 70, height: 68 },
        },
        {
          image: "/explore/main-concept-value-star-small.svg",
          style: {
            right: 14,
            top: 8,
            width: 33,
            height: 32,
            transform: "rotate(14.42deg)",
          },
        },
      ],
    },
  },
  {
    slug: "culture",
    title: "문화재 투어",
    description: "서울 속 오래된\n흔적을 만나는 코스",
    detailDescription: "서울 속 오래된 흔적을 만나는 코스",
    image: "/explore/concept-culture-figma.png",
    detailIcon: "/explore/detail-culture-icon.png",
    star: "/explore/detail-culture-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 32, width: 71, height: 71 },
    headerHeight: 197,
    starStyle: { right: 24, top: 50, width: 119, height: 119 },
    iconStyle: { right: 50, top: 81, width: 92, height: 92 },
    featured: {
      description: "서울 속 오래된 흔적을 만나는 코스",
      iconStyle: { right: 41, top: 16, width: 56, height: 56 },
      stars: [
        {
          image: "/explore/main-concept-culture-star.svg",
          style: {
            right: -5,
            top: -1,
            width: 83,
            height: 83,
            transform: "rotate(-20.62deg)",
          },
        },
      ],
    },
  },
  {
    slug: "nature",
    title: "자연 속 힐링 투어",
    description: "하천과 공원을 따라\n쉬어가는 코스",
    detailDescription: "하천과 공원을 따라 쉬어가는 코스",
    image: "/explore/concept-nature-figma.png",
    detailIcon: "/explore/detail-nature-icon.png",
    star: "/explore/detail-nature-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 20, top: 28, width: 70, height: 76 },
    headerHeight: 197,
    starStyle: { right: 24, top: 40, width: 128, height: 128 },
    iconStyle: { right: 46, top: 67, width: 98, height: 106 },
  },
  {
    slug: "rain",
    title: "비 오는 날 투어",
    description: "흐린 날에도 걷기 좋은\n실내 중심 코스",
    detailDescription: "흐린 날에도 걷기 좋은 실내 중심 코스",
    image: "/explore/concept-rain-figma.png",
    detailIcon: "/explore/detail-rain-icon.png",
    star: "/explore/detail-rain-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 28, width: 68, height: 71 },
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 92, height: 96 },
  },
  {
    slug: "neighborhood",
    title: "동네 탐방 투어",
    description: "익숙하지 않은 골목과\n동네를 만나는 코스",
    detailDescription: "익숙하지 않은 골목과 동네를 만나는 코스",
    image: "/explore/concept-neighborhood-figma.png",
    detailIcon: "/explore/detail-neighborhood-icon.png",
    star: "/explore/detail-neighborhood-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 28, width: 72, height: 72 },
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 97, height: 97 },
  },
  {
    slug: "books",
    title: "전시·서점 투어",
    description: "조용히 보고 머무는\n문화 공간 코스",
    detailDescription: "조용히 보고 머무는 문화 공간 코스",
    image: "/explore/concept-books-figma.png",
    detailIcon: "/explore/detail-books-icon.png",
    star: "/explore/detail-books-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 32, width: 78, height: 72 },
    headerHeight: 197,
    starStyle: { right: 24, top: 51, width: 117, height: 117 },
    iconStyle: { right: 49, top: 82, width: 99, height: 91 },
  },
  {
    slug: "after-work",
    title: "퇴근 후 2시간 투어",
    description: "짧게 다녀와도\n기분 전환되는 코스",
    detailDescription: "짧게 다녀와도 기분 전환되는 코스",
    image: "/explore/concept-clock-figma.png",
    detailIcon: "/explore/detail-after-work-icon.png",
    star: "/explore/detail-after-work-star.png",
    tileStarStyle: { right: 6, top: 10, width: 88, height: 88 },
    tileIconStyle: { right: 24, top: 32, width: 65, height: 70 },
    headerHeight: 197,
    starStyle: { right: 24, top: 47, width: 124, height: 123 },
    iconStyle: { right: 51, top: 79, width: 87, height: 94 },
  },
];

export const featuredConceptTours = conceptTours.filter(
  (concept): concept is ConceptTour & { featured: FeaturedConcept } =>
    concept.featured !== undefined,
);

export const conceptDetails = Object.fromEntries(
  conceptTours.map((concept) => [concept.slug, concept]),
) as Record<ConceptSlug, ConceptTour>;
