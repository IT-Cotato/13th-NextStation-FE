import { exploreAsset } from "@/assets/explore";
import type { CSSProperties } from "react";

export interface ConceptDetail {
  title: string;
  description: readonly string[];
  artwork: string;
  headerHeight: number;
  artworkStyle: CSSProperties;
}

export const conceptDetails = {
  stationery: {
    title: "문구 투어",
    description: ["작은 문구점과 책방을 따라 걷는", "아기자기한 환승여행 코스"],
    artwork: exploreAsset("concept-stationery.svg"),
    headerHeight: 217,
    artworkStyle: { right: 24, top: 59, width: 140, height: 134 },
  },
  value: {
    title: "가성비 투어",
    description: ["돈은 적게, 만족은 충분한 알뜰 코스"],
    artwork: exploreAsset("concept-value.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 46, width: 124, height: 127 },
  },
  culture: {
    title: "문화재 투어",
    description: ["서울 속 오래된 흔적을 만나는 코스"],
    artwork: exploreAsset("concept-culture.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 50, width: 119, height: 123 },
  },
  nature: {
    title: "자연 속 힐링 투어",
    description: ["하천과 공원을 따라 쉬어가는 코스"],
    artwork: exploreAsset("concept-nature.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 40, width: 128, height: 133 },
  },
  rain: {
    title: "비 오는 날 투어",
    description: ["흐린 날에도 걷기 좋은 실내 중심 코스"],
    artwork: exploreAsset("concept-rain.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 49, width: 124, height: 124 },
  },
  neighborhood: {
    title: "동네 탐방 투어",
    description: ["익숙하지 않은 골목과 동네를 만나는 코스"],
    artwork: exploreAsset("concept-neighborhood.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 49, width: 124, height: 124 },
  },
  books: {
    title: "전시·서점 투어",
    description: ["조용히 보고 머무는 문화 공간 코스"],
    artwork: exploreAsset("concept-books.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 51, width: 124, height: 122 },
  },
  "after-work": {
    title: "퇴근 후 2시간 투어",
    description: ["짧게 다녀와도 기분 전환되는 코스"],
    artwork: exploreAsset("concept-after-work.svg"),
    headerHeight: 197,
    artworkStyle: { right: 24, top: 47, width: 124, height: 126 },
  },
} as const satisfies Record<string, ConceptDetail>;

export type ConceptId = keyof typeof conceptDetails;
