export interface MemberProfile {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMyProfile(): Promise<MemberProfile> {
  const accessToken = localStorage.getItem("accessToken");

  if(!accessToken) {
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

  return {
    memberId: data.memberId,
    nickname: data.nickname,
    profileImageUrl: data.profileImageUrl,
  };
}