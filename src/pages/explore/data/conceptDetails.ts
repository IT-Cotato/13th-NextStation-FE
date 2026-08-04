import type { CSSProperties } from "react";

export interface ConceptDetail {
  title: string;
  description: readonly string[];
  star: string;
  icon: string;
  headerHeight: number;
  starStyle: CSSProperties;
  iconStyle: CSSProperties;
}

export const conceptDetails = {
  stationery: {
    title: "문구 투어",
    description: ["작은 문구점과 책방을 따라 걷는", "아기자기한 환승여행 코스"],
    star: "/explore/detail-stationery-star.png",
    icon: "/explore/detail-stationery-icon.png",
    headerHeight: 217,
    starStyle: { right: 24, top: 59, width: 128, height: 127 },
    iconStyle: { right: 41, top: 97, width: 123, height: 96 },
  },
  value: {
    title: "가성비 투어",
    description: ["돈은 적게, 만족은 충분한 알뜰 코스"],
    star: "/explore/detail-value-star.png",
    icon: "/explore/detail-value-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 46, width: 124, height: 124 },
    iconStyle: { right: 51, top: 79, width: 95, height: 94 },
  },
  culture: {
    title: "문화재 투어",
    description: ["서울 속 오래된 흔적을 만나는 코스"],
    star: "/explore/detail-culture-star.png",
    icon: "/explore/detail-culture-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 50, width: 119, height: 119 },
    iconStyle: { right: 50, top: 81, width: 92, height: 92 },
  },
  nature: {
    title: "자연 속 힐링 투어",
    description: ["하천과 공원을 따라 쉬어가는 코스"],
    star: "/explore/detail-nature-star.png",
    icon: "/explore/detail-nature-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 40, width: 128, height: 128 },
    iconStyle: { right: 46, top: 67, width: 98, height: 106 },
  },
  rain: {
    title: "비 오는 날 투어",
    description: ["흐린 날에도 걷기 좋은 실내 중심 코스"],
    star: "/explore/detail-rain-star.png",
    icon: "/explore/detail-rain-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 92, height: 96 },
  },
  neighborhood: {
    title: "동네 탐방 투어",
    description: ["익숙하지 않은 골목과 동네를 만나는 코스"],
    star: "/explore/detail-neighborhood-star.png",
    icon: "/explore/detail-neighborhood-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 97, height: 97 },
  },
  books: {
    title: "전시·서점 투어",
    description: ["조용히 보고 머무는 문화 공간 코스"],
    star: "/explore/detail-books-star.png",
    icon: "/explore/detail-books-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 51, width: 117, height: 117 },
    iconStyle: { right: 49, top: 82, width: 99, height: 91 },
  },
  "after-work": {
    title: "퇴근 후 2시간 투어",
    description: ["짧게 다녀와도 기분 전환되는 코스"],
    star: "/explore/detail-after-work-star.png",
    icon: "/explore/detail-after-work-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 47, width: 124, height: 123 },
    iconStyle: { right: 51, top: 79, width: 87, height: 94 },
  },
} as const satisfies Record<string, ConceptDetail>;

export type ConceptId = keyof typeof conceptDetails;
