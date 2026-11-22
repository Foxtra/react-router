import { Link, Outlet } from 'react-router-dom';
import './crud.css';

export default function CrudLayout() {
  return (
    <div className="crud-app">
      <div className="crud-container">
        <Link className="crud-back" to="/">
          ← К заданиям
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
