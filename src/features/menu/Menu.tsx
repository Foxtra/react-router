import { NavLink } from 'react-router-dom';

const items = [
  { to: '/menu', end: true, label: 'Главная' },
  { to: '/menu/drift', end: false, label: 'Дрифт-такси' },
  { to: '/menu/timeattack', end: false, label: 'Time Attack' },
  { to: '/menu/forza', end: false, label: 'Forza Karting' },
];

export default function Menu() {
  return (
    <nav className="menu">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            isActive ? 'menu__item menu__item-active' : 'menu__item'
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
