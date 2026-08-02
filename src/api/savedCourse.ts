export interface Line {
  id: number;
  name: string;
  code: string;
}

export interface Course {
  courseId: number;
  name: string;
  stationId: number;
  stationName: string;
  line: Line;
  isCompleted: boolean;
}

export interface SavedCourseResponseItem {
  // 백으로부터의 응답 형태
  availableLines: Line[];
  courses: Course[];
  nextCursor: string;
  hasNext: boolean;
}

export interface SavedCourse {
  availableLines: Line[] | null;
  courses: Course[] | null;
  nextCursor: string | null;
  hasNext: boolean;
}

import { getAccessToken } from "@/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 내가 만든 코스 목록 조회
export async function getSavedCourses(
  cursor?: string,
): Promise<SavedCourseResponseItem> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/courses?size=10${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("내가 만든 코스 목록 조회 실패");
  }

  const json = await response.json();

  const item: SavedCourseResponseItem = json.data;

  return {
    availableLines: item.availableLines,
    courses: item.courses,
    nextCursor: item.nextCursor,
    hasNext: item.hasNext,
  };
}

// 코스 삭제
export async function deleteSavedCourses(courseIds: number[]): Promise<void> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/members/me/courses`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseIds }),
  });

  if (!response.ok) {
    throw new Error("코스 삭제 실패");
  }
}

export interface CourseCompletionResult {
  memberStampId: number;
  stationId: number;
  stationName: string;
  acquiredAt: string;
}

// 코스 완료 처리
export async function completeCourse(
  courseId: number,
): Promise<CourseCompletionResult> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/courses/${courseId}/complete`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson.message ?? "여행 완료 처리에 실패했습니다.");
  }

  const json = await response.json();

  return json.data;
}
