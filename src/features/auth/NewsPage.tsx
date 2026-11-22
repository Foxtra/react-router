import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthError, fetchNews } from './api';
import { useAuth } from './AuthContext';
import type { NewsItem } from './types';

export default function NewsPage() {
  const { token, handleUnauthorized } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNews(token);
        if (!cancelled) setNews(data);
      } catch (err) {
        if (err instanceof AuthError && err.status === 401) {
          handleUnauthorized();
          navigate('/auth', { replace: true });
          return;
        }
        if (!cancelled) {
          setError('Не удалось загрузить новости. Запущен ли backend на :7071?');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [token, handleUnauthorized, navigate]);

  if (loading) {
    return <div className="auth-status">Загрузка...</div>;
  }

  if (error) {
    return <div className="auth-status">{error}</div>;
  }

  return (
    <div className="auth-grid">
      {news.map((item) => (
        <Link key={item.id} className="auth-card" to={`/auth/news/${item.id}`}>
          <img className="auth-card__image" src={item.image} alt="" />
          <div className="auth-card__body">
            <h2 className="auth-card__title">{item.title}</h2>
            <p className="auth-card__text">{item.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
