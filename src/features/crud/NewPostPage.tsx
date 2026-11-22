import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from './api';
import { AUTHOR } from './utils';

export default function NewPostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!content.trim() || saving) {
      return;
    }
    setSaving(true);
    try {
      await createPost(content.trim());
      navigate('/crud');
    } catch {
      setSaving(false);
      alert('Не удалось опубликовать пост');
    }
  }

  return (
    <form className="crud-card" onSubmit={handleSubmit}>
      <div className="crud-form__tabs">
        <div className="crud-form__tab crud-form__tab--active">Публикация</div>
        <div className="crud-form__tab">Фото/видео</div>
        <div className="crud-form__tab">Прямой эфир</div>
        <div className="crud-form__tab">Ещё</div>
        <button
          type="button"
          className="crud-btn crud-btn--ghost"
          onClick={() => navigate('/crud')}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>
      <div className="crud-form__body">
        <img className="crud-avatar" src={AUTHOR.avatar} alt="" />
        <textarea
          className="crud-form__textarea"
          placeholder="Что у вас нового?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          autoFocus
        />
      </div>
      <div className="crud-card__footer">
        <button
          type="submit"
          className="crud-btn crud-btn--primary"
          disabled={!content.trim() || saving}
        >
          {saving ? 'Публикация...' : 'Опубликовать'}
        </button>
      </div>
    </form>
  );
}
