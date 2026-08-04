const DEFAULT_COURSE_COUNT = 0;

const conceptTourDefinitions = [
  { slug: "stationery", title: "문구 투어", description: "작은 문구점과 책방을\n찾아가는 코스", image: "/explore/concept-stationery-figma.png", star: "/explore/detail-stationery-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 16, top: 36, width: 89, height: 69 } },
  { slug: "value", title: "가성비 투어", description: "돈은 적게, 만족은\n충분한 알뜰 코스", image: "/explore/concept-value-figma.png", star: "/explore/detail-value-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 70, height: 70 } },
  { slug: "culture", title: "문화재 투어", description: "서울 속 오래된\n흔적을 만나는 코스", image: "/explore/concept-culture-figma.png", star: "/explore/detail-culture-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 71, height: 71 } },
  { slug: "nature", title: "자연 속 힐링 투어", description: "하천과 공원을 따라\n쉬어가는 코스", image: "/explore/concept-nature-figma.png", star: "/explore/detail-nature-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 20, top: 28, width: 70, height: 76 } },
  { slug: "rain", title: "비 오는 날 투어", description: "흐린 날에도 걷기 좋은\n실내 중심 코스", image: "/explore/concept-rain-figma.png", star: "/explore/detail-rain-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 28, width: 68, height: 71 } },
  { slug: "neighborhood", title: "동네 탐방 투어", description: "익숙하지 않은 골목과\n동네를 만나는 코스", image: "/explore/concept-neighborhood-figma.png", star: "/explore/detail-neighborhood-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 28, width: 72, height: 72 } },
  { slug: "books", title: "전시·서점 투어", description: "조용히 보고 머무는\n문화 공간 코스", image: "/explore/concept-books-figma.png", star: "/explore/detail-books-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 78, height: 72 } },
  { slug: "after-work", title: "퇴근 후 2시간 투어", description: "짧게 다녀와도\n기분 전환되는 코스", image: "/explore/concept-clock-figma.png", star: "/explore/detail-after-work-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 65, height: 70 } },
] as const;

export const conceptTours = conceptTourDefinitions.map((tour) => ({
  ...tour,
  courseCount: DEFAULT_COURSE_COUNT,
}));

export const featuredConceptTours = [
  {
    ...conceptTours[0],
    description: "작은 문구점과 책방을 찾아가는 코스",
    iconStyle: { right: 34, top: 20, width: 75, height: 57 },
    stars: [
      {
        image: "/explore/main-concept-stationery-star.svg",
        style: { right: 14, top: -6, width: 88, height: 88 },
      },
    ],
  },
  {
    ...conceptTours[1],
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
  {
    ...conceptTours[2],
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
] as const;
