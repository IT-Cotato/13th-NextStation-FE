import { getAccessToken } from "@/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type TravelDuration = "SHORT" | "HALF_DAY" | "FULL_DAY";

export interface CreateJournalPlaceReviewRequest {
  placeId: number;
  review: string;
  imageUrl: string | null;
}

export interface CreateJournalRequest {
  memberStampId: number;
  title: string;
  overallReview: string;
  traveledAt: string; // "2026-07-08" 형태
  travelDuration: TravelDuration;
  isPublic: boolean;
  journalImageUrls: string[];
  placeReviews: CreateJournalPlaceReviewRequest[];
}

export interface CreateJournalResponse {
  journalId: number;
}

export interface JournalWriteInfoPlace {
  placeId: number;
  placeName: string;
  orderNum: number;
}

export interface JournalWriteInfo {
  stationName: string;
  courseName: string;
  tags: string[];
  places: JournalWriteInfoPlace[];
}

export interface JournalDetailLine {
  id: number;
  name: string;
  code: string;
}

export interface JournalDetailVisitedPlace {
  orderNum: number;
  placeId: number;
  placeName: string;
  review: string | null;
  imageUrl: string | null;
}

export interface JournalDetail {
  writerId?: number;
  writerName: string;
  writerProfileImageUrl: string | null;
  traveledAt: string;
  line: JournalDetailLine;
  stationName: string;
  courseId: number;
  courseName: string;
  isMine: boolean;
  isLiked: boolean;
  tags: string[];
  travelDuration: TravelDuration;
  viewCount: number;
  likeCount: number;
  imageUrls: string[] | null;
  overallReview: string;
  visitedPlaces: JournalDetailVisitedPlace[];
}

export async function getJournalDetail(journalId: number): Promise<JournalDetail> {
  const accessToken = getAccessToken();
  const response = await fetch(`${API_BASE_URL}/api/v1/journals/${journalId}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message ?? "여행일지 상세 정보를 불러오지 못했습니다.");
  }

  const json = await response.json();
  return json.data;
}

export async function createJournal(
  body: CreateJournalRequest,
): Promise<CreateJournalResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/journals`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message ?? "여행일지 작성에 실패했습니다.");
  }

  const json = await response.json();

  return json.data;
}

export async function getJournalWriteInfo(
  memberStampId: number,
): Promise<JournalWriteInfo> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/journals/write-info?memberStampId=${memberStampId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(
      errorJson?.message ?? "여행일지 작성 초기 정보를 불러오지 못했습니다.",
    );
  }

  const json = await response.json();

  return json.data;
}
