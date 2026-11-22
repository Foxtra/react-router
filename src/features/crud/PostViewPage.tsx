import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost, updatePost } from './api';
import type { Post } from './types';
import { AUTHOR, formatRelativeTime } from './utils';

export default function PostViewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const id = Number(postId);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchPost(id);
        if (!cancelled) {
          if (!data) {
            setPost(null);
          } else {
            setPost(data);
            setContent(data.content);
          }
        }
      } catch {
        if (!cancelled) {
          setPost(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (Number.isFinite(id)) {
      void load();
    } else {
      setLoading(false);
      setPost(null);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (busy) return;
    setBusy(true);
    try {
      await deletePost(id);
      navigate('/crud');
    } catch {
      setBusy(false);
      alert('Не удалось удалить пост');
    }
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!content.trim() || busy) return;
    setBusy(true);
    try {
      await updatePost(id, content.trim());
      const refreshed = await fetchPost(id);
      if (refreshed) {
        setPost(refreshed);
        setContent(refreshed.content);
      }
      setEditing(false);
    } catch {
      alert('Не удалось сохранить пост');
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="crud-status">Загрузка...</div>;
  }

  if (!post) {
    return <div className="crud-status">Пост не найден</div>;
  }

  if (editing) {
    return (
      <form className="crud-card" onSubmit={handleSave}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 className="crud-form__title" style={{ flex: 1 }}>
            Редактировать публикацию
          </h2>
          <button
            type="button"
            className="crud-btn crud-btn--ghost"
            onClick={() => {
              setEditing(false);
              setContent(post.content);
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <div className="crud-form__body">
          <img className="crud-avatar" src={AUTHOR.avatar} alt="" />
          <textarea
            className="crud-form__textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            autoFocus
          />
        </div>
        <div className="crud-form__attachments">
          <div className="crud-form__chip">Фото/видео</div>
          <div className="crud-form__chip">Отметить друзей</div>
          <div className="crud-form__chip">Чувства/действия</div>
          <div className="crud-form__chip">Отметить посещение</div>
          <div className="crud-form__chip">GIF</div>
        </div>
        <div className="crud-card__footer">
          <button
            type="submit"
            className="crud-btn crud-btn--primary"
            disabled={!content.trim() || busy}
          >
            {busy ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <article className="crud-card">
      <div className="crud-card__header">
        <img className="crud-avatar" src={AUTHOR.avatar} alt="" />
        <div className="crud-card__meta">
          <div className="crud-card__name">{AUTHOR.name}</div>
          <div className="crud-card__role">{AUTHOR.role}</div>
          <div className="crud-card__time">{formatRelativeTime(post.created)}</div>
        </div>
      </div>
      <div className="crud-card__content">{post.content}</div>
      <div className="crud-card__actions">
        <span className="crud-card__action">Нравится</span>
        <span className="crud-card__action">Комментировать</span>
      </div>
      <div className="crud-card__footer">
        <button
          type="button"
          className="crud-btn crud-btn--primary"
          onClick={() => setEditing(true)}
        >
          Изменить
        </button>
        <button
          type="button"
          className="crud-btn crud-btn--danger"
          onClick={() => void handleDelete()}
          disabled={busy}
        >
          Удалить
        </button>
      </div>
    </article>
  );
}
