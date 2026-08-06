import { getAccessToken } from "@/api/auth";
import type { RecommendationTravelStyle } from "@/api/recommendation";
export interface StationLine {
  id: number;
  name: string;
  code: string;
}

export interface StationCategoryPlace {
  placeId: number;
  placeName: string;
  description: string;
  imageUrl: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface StationCategory {
  categoryCode: string;
  categoryName: string;
  places: StationCategoryPlace[];
}

export interface StationCourseRecommendationResponseItem {
  // 백으로부터의 응답 형태
  stationId: number;
  stationName: string;
  description: string;
  line: StationLine;
  lines: StationLine[];
  tags: string[];
  defaultCourseName: string;
  categories: StationCategory[];
}

export interface StationCourseRecommendation {
  // 프론트에서의 변수 형태
  stationId: number;
  stationName: string;
  description: string;
  line: StationLine;
  lines: StationLine[];
  tags: string[];
  defaultCourseName: string;
  categories: StationCategory[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function buildStationCourseRecommendationUrl(
  baseUrl: string,
  stationId: number,
  travelStyles?: RecommendationTravelStyle[],
) {
  const params = new URLSearchParams();

  travelStyles?.forEach((travelStyle) => {
    params.append("travelStyles", travelStyle);
  });

  const query = params.toString();
  const path = `${baseUrl}/api/v1/stations/${stationId}/places`;

  return query ? `${path}?${query}` : path;
}

// 역별 장소 목록 조회 (맞춤 추천용)
export async function getStationCourseRecommendation(
  stationId: number,
  travelStyles?: RecommendationTravelStyle[],
): Promise<StationCourseRecommendation> {
  const response = await fetch(
    buildStationCourseRecommendationUrl(API_BASE_URL, stationId, travelStyles),
  );
  if (!response.ok) {
    throw new Error("역별 장소 목록 조회 실패");
  }

  const json = await response.json();

  const item: StationCourseRecommendationResponseItem = json.data;

  return {
    stationId: item.stationId,
    stationName: item.stationName,
    description: item.description,
    line: item.line,
    lines: item.lines,
    tags: item.tags,
    defaultCourseName: item.defaultCourseName,
    categories: item.categories,
  };
}

export interface CreatedCourse {
  courseId: number;
  name: string;
  createdAt: string;
}

// 코스 생성 (맞춤 추천용)
export async function createCourse(
  stationId: number,
  name: string,
  placeIds: number[],
): Promise<CreatedCourse> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ stationId, name, placeIds }),
  });

  if (!response.ok) {
    throw new Error("코스 생성 실패");
  }

  const json = await response.json();

  return json.data;
}
