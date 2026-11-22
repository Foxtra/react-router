import { Link, Outlet } from 'react-router-dom';
import Menu from './Menu';
import './menu.css';

export default function MenuLayout() {
  return (
    <div className="menu-app">
      <Link className="menu-back" to="/">
        ← К заданиям
      </Link>
      <Menu />
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}
