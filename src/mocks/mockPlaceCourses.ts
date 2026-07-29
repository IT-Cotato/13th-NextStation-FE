import type { SubwayLine } from "@/components/LineBadge";

export interface PlaceCourse {
  courseId: number;
  name: string;
  stationName: string;
  line: SubwayLine;
  placeCount: number;
  saveCount: number;
  viewCount: number;
}

export interface PlaceCoursesResponse {
  courses: PlaceCourse[];
}

export const mockPlaceCourses: PlaceCoursesResponse = {
  courses: [
    {
      courseId: 1,
      name: "보문 & 창신 고즈넉한 한옥 산책 코스",
      stationName: "보문역",
      line: 6,
      placeCount: 4,
      saveCount: 342,
      viewCount: 1250,
    },
    {
      courseId: 2,
      name: "옥수 & 금호 한강뷰 카페 투어",
      stationName: "옥수역",
      line: 3,
      placeCount: 3,
      saveCount: 890,
      viewCount: 3400,
    },
    {
      courseId: 3,
      name: "아차산 둘레길 & 맛집 탐방",
      stationName: "아차산역",
      line: 5,
      placeCount: 5,
      saveCount: 512,
      viewCount: 2100,
    },
    {
      courseId: 4,
      name: "양천구청 근린공원 피크닉 코스",
      stationName: "양천구청역",
      line: 2,
      placeCount: 4,
      saveCount: 120,
      viewCount: 680,
    },
    {
      courseId: 5,
      name: "독립문 & 무악재 역사 문화 산책 코스",
      stationName: "독립문역",
      line: 3,
      placeCount: 4,
      saveCount: 640,
      viewCount: 2450,
    },
    {
      courseId: 6,
      name: "동묘앞 빈티지 구제시장 & LP 투어",
      stationName: "동묘앞역",
      line: 1,
      placeCount: 5,
      saveCount: 1120,
      viewCount: 4300,
    },
  ],
};
