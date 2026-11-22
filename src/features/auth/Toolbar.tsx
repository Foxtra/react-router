import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Toolbar() {
  const { profile, login, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(username, password);
      navigate('/auth/news');
    } catch {
      setError('Неверный логин или пароль');
    } finally {
      setBusy(false);
    }
  }

  function handleLogout() {
    logout();
    navigate('/auth');
  }

  return (
    <>
      <Link className="auth-back" to="/">
        ← К заданиям
      </Link>
      <header className="auth-toolbar">
        <Link className="auth-brand" to={profile ? '/auth/news' : '/auth'}>
          Neto Social
        </Link>
        <div className="auth-toolbar__right">
          {profile ? (
            <>
              <div className="auth-hello">
                <span>Hello, {profile.name}</span>
                <img className="auth-avatar" src={profile.avatar} alt="" />
              </div>
              <button
                type="button"
                className="auth-btn auth-btn--logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <form className="auth-toolbar__right" onSubmit={handleLogin}>
              <input
                className="auth-input"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
              <button
                type="submit"
                className="auth-btn auth-btn--login"
                disabled={busy}
              >
                Login
              </button>
              {error && <p className="auth-error">{error}</p>}
            </form>
          )}
        </div>
      </header>
    </>
  );
}
