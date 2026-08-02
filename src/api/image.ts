import { getAccessToken } from "@/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type ImageFolder = "JOURNAL" | "PROFILE";

export interface PresignedUrlItem {
  presignedUrl: string;
  imageUrl: string;
  contentType: string;
}

export interface GetPresignedUrlRequest {
  folder: ImageFolder;
  journalId?: number;
  fileName: string;
}

export interface GetPresignedUrlsBatchRequest {
  folder: ImageFolder;
  journalId?: number;
  fileNames: string[];
}

interface ApiResponse<T> {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: T;
  timestamp: string;
}

// 단일 발급
export async function getPresignedUrl(
  body: GetPresignedUrlRequest,
): Promise<PresignedUrlItem> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/images/presigned-url`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message ?? "이미지 업로드 URL 발급에 실패했습니다.");
  }

  const json: ApiResponse<PresignedUrlItem> = await response.json();
  return json.data;
}

// 다중 발급
export async function getPresignedUrlsBatch(
  body: GetPresignedUrlsBatchRequest,
): Promise<PresignedUrlItem[]> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/images/presigned-urls/batch`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message ?? "다중 이미지 업로드 URL 발급에 실패했습니다.");
  }

  const json: ApiResponse<PresignedUrlItem[]> = await response.json();
  return json.data;
}

// 사진 업로드 함수
export async function uploadFileToPresignedUrl(
  presignedUrl: string,
  file: File,
  contentType: string,
): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }
}

// 이미지 삭제
export async function deleteImage(imageUrl: string): Promise<void> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/images?imageUrl=${encodeURIComponent(imageUrl)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message ?? "이미지 삭제에 실패했습니다.");
  }
}

// 파일명 중복 방지용
export function createUploadFileName(file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  return `${crypto.randomUUID()}.${extension}`;
}
