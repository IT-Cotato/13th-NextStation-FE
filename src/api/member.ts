import { getAccessToken } from "./auth";

export interface MemberProfile {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MEMBER_PROFILE_STORAGE_KEY = "member.profile";

export function saveCachedMyProfile(profile: MemberProfile) {
  sessionStorage.setItem(MEMBER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function getCachedMyProfile(): MemberProfile | null {
  const storedProfile = sessionStorage.getItem(MEMBER_PROFILE_STORAGE_KEY);

  if (!storedProfile) {
    return null;
  }

  try {
    return JSON.parse(storedProfile) as MemberProfile;
  } catch {
    return null;
  }
}

export function clearCachedMyProfile() {
  sessionStorage.removeItem(MEMBER_PROFILE_STORAGE_KEY);
}

export async function getMyProfile(): Promise<MemberProfile> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/members/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("내 프로필 조회 실패");
  }

  const json = await response.json();
  const data = json.data;

  const profile = {
    memberId: data.memberId,
    nickname: data.nickname,
    profileImageUrl: data.profileImageUrl,
  };

  saveCachedMyProfile(profile);

  return profile;
}

export interface LikedCourseLine {
  id: number;
  name: string;
  code: string;
}

export interface LikedCourse {
  courseId: number;
  name: string;
  stationId: number;
  stationName: string;
  line: LikedCourseLine;
}

interface LikedCoursesResponseData {
  courses: LikedCourse[];
  nextCursor: string | null;
  hasNext: boolean;
}

export async function getLikedCourses(
  cursor?: string,
  size = 10,
): Promise<LikedCoursesResponseData> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const params = new URLSearchParams();

  if (cursor) {
    params.set("cursor", cursor);
  }

  params.set("size", String(size));

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/liked-courses?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("좋아요한 코스 목록 조회 실패");
  }

  const json = await response.json();
  const data = json.data;

  return {
    courses: (data.courses ?? []).map((course: LikedCourse) => ({
      courseId: course.courseId,
      name: course.name,
      stationId: course.stationId,
      stationName: course.stationName,
      line: course.line,
    })),
    nextCursor: data.nextCursor ?? null,
    hasNext: data.hasNext ?? false,
  };
}

export async function deleteLikedCourses(courseIds: number[]): Promise<void> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/liked-courses`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseIds }),
    },
  );

  if (!response.ok) {
    throw new Error("좋아요한 코스 다중 취소 실패");
  }
}

export async function deleteAllLikedCourses(): Promise<void> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/liked-courses/all`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("좋아요한 코스 전체 취소 실패");
  }
}
