import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import FavoriteNavbarLinkIcon from '../../../ui/navBarLink/FavoriteNavbarLinkIcon';
import SearchNavBarLinkIcon from '../../../ui/navBarLink/SearchNavBarLinkIcon';

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

      <NavLink
        className={({ isActive }) => `header_navbar_link__icon${isActive ? '__active' : ''}`}
        to={'/'}
      >
        <SearchNavBarLinkIcon />
      </NavLink>
      <NavLink
        className={({ isActive }) => `header_navbar_link__icon${isActive ? '__active' : ''}`}
        to={'/favorite-vacancy'}
      >
        <FavoriteNavbarLinkIcon />
      </NavLink>
    </nav>
  );
}
export default Navbar;
