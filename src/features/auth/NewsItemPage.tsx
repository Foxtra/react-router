import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthError, fetchNewsItem } from './api';
import { useAuth } from './AuthContext';
import type { NewsItem } from './types';
import NotFoundPage from './NotFoundPage';

export default function NewsItemPage() {
  const { id } = useParams();
  const { token, handleUnauthorized } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!token || !id) return;
      setLoading(true);
      setNotFound(false);
      try {
        const data = await fetchNewsItem(token, id);
        if (!cancelled) setItem(data);
      } catch (err) {
        if (err instanceof AuthError && err.status === 401) {
          handleUnauthorized();
          navigate('/auth', { replace: true });
          return;
        }
        if (err instanceof AuthError && err.status === 404) {
          if (!cancelled) setNotFound(true);
          return;
        }
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [token, id, handleUnauthorized, navigate]);

  if (loading) {
    return <div className="auth-status">Загрузка...</div>;
  }

  if (notFound || !item) {
    return <NotFoundPage />;
  }

  return (
    <article className="auth-news-detail">
      <div className="auth-card">
        <img className="auth-card__image" src={item.image} alt="" />
        <div className="auth-card__body">
          <h1 className="auth-card__title">{item.title}</h1>
          <p className="auth-card__text">{item.content}</p>
        </div>
      </div>
    </article>
  );
}
