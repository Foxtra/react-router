import type { Post } from './types';

const API_URL = 'http://localhost:7070/posts';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to load posts');
  }
  return response.json();
}

export async function fetchPost(id: number): Promise<Post | undefined> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to load post');
  }
  const data = await response.json();
  return data.post as Post | undefined;
}

export async function createPost(content: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 0, content }),
  });
  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to create post');
  }
}

export async function updatePost(id: number, content: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, content }),
  });
  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to update post');
  }
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to delete post');
  }
}
