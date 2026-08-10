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
  writerId: number;
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

export interface Line {
  id: number;
  name: string;
  code: string;
}

export interface Journal {
  journalId: number;
  line: Line;
  title: string;
  stationName: string;
  thumbnailUrl: string;
  likeCount: number;
}

export interface JournalsResponseItem {
  // 백으로부터의 응답 형태
  journals: Journal[];
  nextCursor: string;
  hasNext: boolean;
}

export interface Journals {
  // 프론트에서의 변수 형태
  journals: Journal[];
  nextCursor: string;
  hasNext: boolean;
}

export interface Course {
  memberStampId: number;
  stationName: string;
  line: Line;
  courseName: string;
  tags: string[];
  acquiredAt: string;
}

export interface UnwrittenJournalsResponseItem {
  // 백으로부터의 응답 형태
  totalCount: number;
  courses: Course[];
}

export interface UnwrittenJournals {
  // 프론트에서의 변수 형태
  totalCount: number;
  courses: Course[];
}

// 내 여행일지 목록 조회
export async function getJournals(cursor?: string): Promise<Journals> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/members/me/journals?size=10${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("내 여행일지 목록 조회 실패");
  }

  const json = await response.json();

  const item: JournalsResponseItem = json.data;

  return {
    journals: item.journals,
    nextCursor: item.nextCursor,
    hasNext: item.hasNext,
  };
}

// 미작성 여행일지 목록 조회
export async function getUnwrittenJournals(): Promise<UnwrittenJournals> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/journals/uncompleted`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("미작성 여행일지 목록 조회 실패");
  }

  const json = await response.json();

  const item: UnwrittenJournalsResponseItem = json.data;

  return {
    totalCount: item.totalCount,
    courses: item.courses,
  };
}
