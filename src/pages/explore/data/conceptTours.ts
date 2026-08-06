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

export const conceptTours = [
  {
    slug: "stationery",
    title: "문구 투어",
    description: "작은 문구점과 책방을\n찾아가는 코스",
    Artwork: StationeryArtwork,
    artworkStyle: { width: 100, height: 96 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "value",
    title: "가성비 투어",
    description: "돈은 적게, 만족은\n충분한 알뜰 코스",
    Artwork: ValueArtwork,
    artworkStyle: { width: 92, height: 94 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "culture",
    title: "문화재 투어",
    description: "서울 속 오래된\n흔적을 만나는 코스",
    Artwork: CultureArtwork,
    artworkStyle: { width: 92, height: 95 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "nature",
    title: "자연 속 힐링 투어",
    description: "하천과 공원을 따라\n쉬어가는 코스",
    Artwork: NatureArtwork,
    artworkStyle: { width: 92, height: 96 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "rain",
    title: "비 오는 날 투어",
    description: "흐린 날에도 걷기 좋은\n실내 중심 코스",
    Artwork: RainArtwork,
    artworkStyle: { width: 92, height: 92 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "neighborhood",
    title: "동네 탐방 투어",
    description: "익숙하지 않은 골목과\n동네를 만나는 코스",
    Artwork: NeighborhoodArtwork,
    artworkStyle: { width: 92, height: 92 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "books",
    title: "전시·서점 투어",
    description: "조용히 보고 머무는\n문화 공간 코스",
    Artwork: BooksArtwork,
    artworkStyle: { width: 92, height: 91 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
  {
    slug: "after-work",
    title: "퇴근 후 2시간 투어",
    description: "짧게 다녀와도\n기분 전환되는 코스",
    Artwork: AfterWorkArtwork,
    artworkStyle: { width: 92, height: 94 },
    courseCount: DEFAULT_COURSE_COUNT,
  },
] as const;

export const featuredConceptTours = [
  {
    ...conceptTours[0],
    description: "작은 문구점과 책방을 찾아가는 코스",
    Artwork: FeaturedStationeryArtwork,
    artworkStyle: { width: 97, height: 80 },
  },
  {
    ...conceptTours[1],
    description: "돈은 적게, 만족은 충분한 알뜰 코스",
    Artwork: FeaturedValueArtwork,
    artworkStyle: { width: 140, height: 76 },
  },
  {
    ...conceptTours[2],
    description: "서울 속 오래된 흔적을 만나는 코스",
    Artwork: FeaturedCultureArtwork,
    artworkStyle: { width: 97, height: 80 },
  },
] as const;
