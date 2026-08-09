export interface Line {
  id: number;
  name: string;
  code: string;
}

export interface Place {
  placeId: number;
  placeName: string;
  description: string;
  imageUrl: null | string;
  xCoordinate: number;
  yCoordinate: number;
  orderNum: number;
}

export interface CourseDetailResponseItem {
  // 백으로부터의 응답 형태
  courseId: number;
  name: string;
  stationId: number;
  stationName: string;
  line: Line;
  places: Place[];
}

export interface CourseDetail {
  // 프론트에서의 변수 형태
  courseId: number;
  courseName: string;
  stationId: number;
  stationName: string;
  lineId: number;
  places: Place[];
}

import { getAccessToken } from "@/api/auth";
import type { SubwayLine } from "@/types/subway";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CourseDetailImage {
  id: number;
  src: string;
  alt: string;
}

export interface CourseDetailPlaceData {
  id: number;
  name: string;
  description: string;
  imageUrl?: string | null;
  imagePosition: "left" | "right";
}

export interface CourseDetailData {
  id: number;
  line: SubwayLine;
  stationName: string;
  title: string;
  subtitle: string;
  viewCount: number;
  saveCount: number;
  authorName: string;
  authorId?: number;
  authorProfileImageUrl?: string | null;
  visitedAt: string;
  isMine?: boolean;
  isLiked?: boolean;
  review: string;
  duration: string;
  tags: string[];
  images: CourseDetailImage[];
  places: CourseDetailPlaceData[];
}

// 내가 만든 코스 확인
export async function getCourseDetail(courseId: number): Promise<CourseDetail> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/courses/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("내가 만든 코스 확인 실패");
  }

  const json = await response.json();

  const item: CourseDetailResponseItem = json.data;

  return {
    courseId: item.courseId,
    courseName: item.name,
    stationId: item.stationId,
    stationName: item.stationName,
    lineId: item.line.id,
    places: item.places,
  };
}

export interface PatchCourseDetailPayload {
  name?: string;
  placeIds?: number[];
}

export interface PatchCourseDetailResult {
  courseId: number;
  name: string;
}

export interface CopiedCourse {
  courseId: number;
  name: string;
  stationName: string;
}

// 공개 코스를 내 코스로 복제
export async function copyCourse(
  courseId: number,
  name: string,
): Promise<CopiedCourse> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/courses/${courseId}/copy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(json?.message ?? "코스를 복제하지 못했습니다.");
  }

  return json.data;
}

// 코스 수정
export async function patchCourseDetail(
  courseId: number,
  payload: PatchCourseDetailPayload,
): Promise<PatchCourseDetailResult> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/courses/${courseId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("코스 수정 실패");
  }

  const json = await response.json();

  return json.data;
}
