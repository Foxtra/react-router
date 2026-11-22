import { Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Toolbar from './Toolbar';
import './auth.css';

export default function AuthLayout() {
  return (
    <AuthProvider>
      <div className="auth-app">
        <Toolbar />
        <main className="auth-main">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}
