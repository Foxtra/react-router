import { Link } from 'react-router-dom';
import type { Post } from './types';
import { AUTHOR, formatRelativeTime } from './utils';

interface PostCardProps {
  post: Post;
  interactive?: boolean;
}

export default function PostCard({ post, interactive = true }: PostCardProps) {
  const content = (
    <>
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
      <div className="crud-card__comment">
        <img className="crud-avatar" src={AUTHOR.avatar} alt="" />
        <div className="crud-card__comment-input">Напишите комментарий...</div>
      </div>
    </>
  );

  if (!interactive) {
    return <article className="crud-card">{content}</article>;
  }

  return (
    <Link className="crud-card" to={`/crud/posts/${post.id}`}>
      {content}
    </Link>
  );
}
