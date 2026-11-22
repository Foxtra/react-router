import type { NewsItem, Profile } from './types';

const API_URL = 'http://localhost:7071';

export class AuthError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}

export async function loginRequest(
  username: string,
  password: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await parseJson<{ token?: string; message?: string }>(response);
  if (!response.ok || !data?.token) {
    throw new AuthError(response.status, data?.message ?? 'Login failed');
  }
  return data.token;
}

export async function fetchProfile(token: string): Promise<Profile> {
  const response = await fetch(`${API_URL}/private/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    throw new AuthError(401, 'Unauthorized');
  }
  if (!response.ok) {
    throw new AuthError(response.status, 'Failed to load profile');
  }
  return parseJson<Profile>(response);
}

export async function fetchNews(token: string): Promise<NewsItem[]> {
  const response = await fetch(`${API_URL}/private/news`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    throw new AuthError(401, 'Unauthorized');
  }
  if (!response.ok) {
    throw new AuthError(response.status, 'Failed to load news');
  }
  return parseJson<NewsItem[]>(response);
}

export async function fetchNewsItem(
  token: string,
  id: string,
): Promise<NewsItem> {
  const response = await fetch(`${API_URL}/private/news/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    throw new AuthError(401, 'Unauthorized');
  }
  if (response.status === 404) {
    throw new AuthError(404, 'Not found');
  }
  if (!response.ok) {
    throw new AuthError(response.status, 'Failed to load news item');
  }
  return parseJson<NewsItem>(response);
}
