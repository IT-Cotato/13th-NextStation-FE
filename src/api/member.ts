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
