import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from './api';
import PostCard from './PostCard';
import type { Post } from './types';

export default function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts();
        if (!cancelled) {
          setPosts(data.slice().reverse());
        }
      } catch {
        if (!cancelled) {
          setError('Не удалось загрузить посты. Запущен ли backend на :7070?');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="crud-toolbar">
        <Link className="crud-btn crud-btn--primary" to="/crud/posts/new">
          Создать пост
        </Link>
      </div>

      {loading && <div className="crud-status">Загрузка...</div>}
      {error && <div className="crud-status">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <div className="crud-empty">Пока нет постов. Создайте первый!</div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
