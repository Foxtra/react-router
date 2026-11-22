import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute() {
  const { token, ready } = useAuth();

  if (!ready) {
    return <div className="auth-status">Загрузка...</div>;
  }

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
