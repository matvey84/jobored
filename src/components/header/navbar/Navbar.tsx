import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
  return (
    <nav className="header_navbar">
      <NavLink
        className={({ isActive }) => `header_navbar_link${isActive ? '__active' : ''}`}
        to={'/'}
      >
        Поиск Вакансий
      </NavLink>
      <NavLink
        className={({ isActive }) => `header_navbar_link${isActive ? '__active' : ''}`}
        to={'/favorite-vacancy'}
      >
        Избранное
      </NavLink>
    </nav>
  );
}
export default Navbar;
