import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="hub">
      <h1 className="hub__title">React Router</h1>
      <p className="hub__subtitle">Три задания в одном проекте</p>
      <nav className="hub__nav">
        <Link className="hub__link" to="/menu">
          Меню
        </Link>
        <Link className="hub__link" to="/crud">
          CRUD
        </Link>
        <Link className="hub__link" to="/auth">
          Authentication
        </Link>
      </nav>
    </div>
  );
}
