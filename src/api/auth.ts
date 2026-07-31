const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(
  /\/+$/,
  '',
);

interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export class AuthApiError extends Error {
  code: string;
  status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'AuthApiError';
    this.code = code;
    this.status = status;
  }
}

async function authRequest<T>(path: string, init: RequestInit): Promise<T> {
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
    );
  }

  return body.data;
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

export function saveAccessToken(accessToken: string) {
  sessionStorage.setItem('auth.accessToken', accessToken);
}
