const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(
  /\/+$/,
  '',
);

const AGREED_TERMS_STORAGE_KEY = 'auth.agreedTermsIds';
const SIGNUP_TOKEN_STORAGE_KEY = 'auth.signupToken';
const ACCESS_TOKEN_STORAGE_KEY = 'auth.accessToken';
const KAKAO_SIGNUP_TOKEN_STORAGE_KEY = 'auth.kakaoSignupToken';
const KAKAO_PROFILE_STORAGE_KEY = 'auth.kakaoProfile';
const KAKAO_OAUTH_STATE_STORAGE_KEY = 'auth.kakaoOAuthState';

export const REQUIRED_TERMS_IDS = [1, 2] as const;
export const MARKETING_TERM_ID = 3;

export interface AuthTerm {
  id: number;
  title: string;
  content: string;
  version: string;
  isRequired: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: T;
  reasons?: Record<string, string>;
}

export class AuthApiError extends Error {
  status: number;
  code: string;
  reasons?: Record<string, string>;

  constructor(
    status: number,
    code: string,
    message: string,
    reasons?: Record<string, string>,
  ) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
    this.code = code;
    this.reasons = reasons;
  }
}

async function authRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !body.success) {
    throw new AuthApiError(
      response.status,
      body.code,
      body.message || '요청을 처리하지 못했습니다.',
      body.reasons,
    );
  }

  return body.data;
}

export function saveAgreedTermsIds(ids: number[]) {
  sessionStorage.setItem(AGREED_TERMS_STORAGE_KEY, JSON.stringify(ids));
}

export function getAgreedTermsIds(): number[] {
  const storedIds = sessionStorage.getItem(AGREED_TERMS_STORAGE_KEY);

  if (!storedIds) {
    return [];
  }

  try {
    const ids: unknown = JSON.parse(storedIds);
    return Array.isArray(ids)
      ? ids.filter((id): id is number => typeof id === 'number')
      : [];
  } catch {
    return [];
  }
}

export function saveSignupToken(token: string) {
  sessionStorage.setItem(SIGNUP_TOKEN_STORAGE_KEY, token);
}

export function getSignupToken() {
  return sessionStorage.getItem(SIGNUP_TOKEN_STORAGE_KEY);
}

export function clearSignupFlow() {
  sessionStorage.removeItem(AGREED_TERMS_STORAGE_KEY);
  sessionStorage.removeItem(SIGNUP_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(KAKAO_SIGNUP_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(KAKAO_PROFILE_STORAGE_KEY);
}

export function saveAccessToken(token: string) {
  sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function getTerms() {
  return authRequest<AuthTerm[]>('/api/v1/auth/terms');
}

export function createKakaoOAuthState() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const state = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  sessionStorage.setItem(KAKAO_OAUTH_STATE_STORAGE_KEY, state);
  return state;
}

export function getKakaoOAuthState() {
  return sessionStorage.getItem(KAKAO_OAUTH_STATE_STORAGE_KEY);
}

export function clearKakaoOAuthState() {
  sessionStorage.removeItem(KAKAO_OAUTH_STATE_STORAGE_KEY);
}

export function sendEmailVerification(email: string, agreedTermsIds: number[]) {
  return authRequest<string>('/api/v1/auth/email/verification', {
    method: 'POST',
    body: JSON.stringify({ email, agreedTermsIds }),
  });
}

export function confirmEmailVerification(email: string, code: string) {
  return authRequest<string>('/api/v1/auth/email/verification/confirm', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
}

interface SignupResponse {
  memberId: number;
  signupToken: string;
}

export function signup(
  email: string,
  password: string,
  passwordConfirm: string,
  agreedTermsIds: number[],
) {
  return authRequest<SignupResponse>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      passwordConfirm,
      agreedTermsIds,
    }),
  });
}

interface ProfileResponse {
  memberId: number;
  nickname: string;
  status: 'ACTIVE';
}

export function setupProfile(
  signupToken: string,
  profile: {
    nickname: string;
    profileImageUrl?: string;
    gender: 'MALE' | 'FEMALE' | 'UNSPECIFIED';
    birthDate: string;
  },
) {
  return authRequest<ProfileResponse>('/api/v1/auth/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${signupToken}`,
    },
    body: JSON.stringify(profile),
  });
}

interface LoginResponse {
  memberId: number;
  accessToken: string;
}

export function login(email: string, password: string) {
  return authRequest<LoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function reissueAccessToken() {
  return authRequest<{ accessToken: string }>('/api/v1/auth/reissue', {
    method: 'POST',
  });
}

export interface KakaoProfileDraft {
  nickname: string;
  profileImageUrl?: string;
}

export function saveKakaoSignupToken(token: string) {
  sessionStorage.setItem(KAKAO_SIGNUP_TOKEN_STORAGE_KEY, token);
}

export function getKakaoSignupToken() {
  return sessionStorage.getItem(KAKAO_SIGNUP_TOKEN_STORAGE_KEY);
}

export function saveKakaoProfile(profile: KakaoProfileDraft) {
  sessionStorage.setItem(KAKAO_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function getKakaoProfile(): KakaoProfileDraft | null {
  const storedProfile = sessionStorage.getItem(KAKAO_PROFILE_STORAGE_KEY);

  if (!storedProfile) {
    return null;
  }

  try {
    return JSON.parse(storedProfile) as KakaoProfileDraft;
  } catch {
    return null;
  }
}

interface KakaoLoginResponse {
  resultType: 'LOGIN_SUCCESS' | 'PENDING_PROFILE' | 'NEW_MEMBER';
  memberId?: number;
  accessToken?: string;
  signupToken?: string;
  kakaoSignupToken?: string;
  kakaoNickname?: string;
  kakaoProfileImageUrl?: string;
}

export function kakaoLogin(code: string, signal?: AbortSignal) {
  return authRequest<KakaoLoginResponse>('/api/v1/auth/kakao/login', {
    method: 'POST',
    signal,
    body: JSON.stringify({ code }),
  });
}

export function sendPasswordResetVerification(email: string) {
  return authRequest<string>(
    '/api/v1/auth/password-reset/email/verification',
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  );
}

export function confirmPasswordResetVerification(email: string, code: string) {
  return authRequest<string>(
    '/api/v1/auth/password-reset/email/verification/confirm',
    {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    },
  );
}

export function resetPassword(
  email: string,
  code: string,
  newPassword: string,
  newPasswordConfirm: string,
) {
  return authRequest<string>('/api/v1/auth/password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email,
      code,
      newPassword,
      newPasswordConfirm,
    }),
  });
}

export function kakaoSignup(
  kakaoSignupToken: string,
  agreedTermsIds: number[],
) {
  return authRequest<SignupResponse>('/api/v1/auth/kakao/signup', {
    method: 'POST',
    body: JSON.stringify({ kakaoSignupToken, agreedTermsIds }),
  });
}
