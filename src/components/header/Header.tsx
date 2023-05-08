import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { LogoSVG } from '../../ui/LogoSVG';
import Navbar from './navbar/Navbar';

function Header() {
  return (
    <section className="header">
      <div className="header-container">
        <NavLink className={'header_logo__container'} to={'/'}>
          <LogoSVG />
          <h1 className="header_logo__title">Jobored</h1>
        </NavLink>
        <Navbar />
      </div>
    </section>
  );
}

export default Header;
