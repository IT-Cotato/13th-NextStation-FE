import { getAccessToken } from "./auth";

export interface MemberProfile {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MEMBER_PROFILE_STORAGE_KEY = "member.profile";

export interface PublicMemberProfile {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
  publicCourseCount: number;
  stampCount: number;
}

export interface PublicMemberStamp {
  stationId: number;
  stationName: string;
  lines: LikedCourseLine[];
}

export interface PublicMemberCourse {
  courseId: number;
  name: string;
  stationName: string;
  line: LikedCourseLine;
  imageUrl?: string | null;
  likeCount?: number | null;
}

export interface PublicMemberCourses {
  courses: PublicMemberCourse[];
  nextCursor: string | null;
  hasNext: boolean;
}

async function getPublicMemberData<T>(path: string): Promise<T> {
  const accessToken = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  const json = await response.json().catch(() => null);
  if (!response.ok) throw new Error(json?.message ?? "프로필 정보를 불러오지 못했습니다.");
  return json.data as T;
}

export async function getPublicMemberProfile(memberId: number): Promise<PublicMemberProfile> {
  const data = await getPublicMemberData<Omit<PublicMemberProfile, "publicCourseCount" | "stampCount"> & { publicCourseCount: string | number; stampCount: string | number }>(`/api/v1/members/${memberId}/profile`);
  return { ...data, publicCourseCount: Number(data.publicCourseCount), stampCount: Number(data.stampCount) };
}

export async function getPublicMemberStamps(memberId: number): Promise<PublicMemberStamp[]> {
  const data = await getPublicMemberData<{ stampCount: number; stamps: PublicMemberStamp[] }>(`/api/v1/members/${memberId}/stamps`);
  return data.stamps ?? [];
}

export async function getPublicMemberCourses(memberId: number, cursor?: string): Promise<PublicMemberCourses> {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  const query = params.size ? `?${params}` : "";
  const data = await getPublicMemberData<{ courses: PublicMemberCourse[]; nextCursor: string | number | null; hasNext: boolean }>(`/api/v1/members/${memberId}/courses${query}`);
  return { courses: data.courses ?? [], nextCursor: data.nextCursor == null ? null : String(data.nextCursor), hasNext: data.hasNext ?? false };
}

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

export async function deleteAllLikedCourses(
  exceptCourseIds: number[],
): Promise<void> {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exceptCourseIds }),
    },
  );

  if (!response.ok) {
    throw new Error("좋아요한 코스 전체 취소 실패");
  }
}
