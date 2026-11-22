export function formatRelativeTime(created: number): string {
  const diffMs = Date.now() - created;
  const minutes = Math.max(1, Math.floor(diffMs / 60000));
  if (minutes < 60) {
    return `${minutes} мин.`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ч.`;
  }
  return `${Math.floor(hours / 24)} д.`;
}

export const AUTHOR = {
  name: 'Ilnaz Gilyazov',
  role: 'Основатель группы',
  avatar: 'https://i.pravatar.cc/40?u=ilnaz',
};
