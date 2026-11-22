import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LandingPage() {
  const { token, ready } = useAuth();

  if (!ready) {
    return <div className="auth-status">Загрузка...</div>;
  }

  if (token) {
    return <Navigate to="/auth/news" replace />;
  }

  return (
    <section className="auth-hero">
      <h1>Neto Social</h1>
      <p>Facebook and VK killer.</p>
    </section>
  );
}
