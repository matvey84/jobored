import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
  return (
    <nav className="header_navbar">
      <NavLink className={'header_navbar__link'} to={'/'}>
        Поиск Вакансий
      </NavLink>
      <NavLink className={'header_navbar__link'} to={'/favorite-vacancy'}>
        Избранное
      </NavLink>
    </nav>
  );
}
export default Navbar;
