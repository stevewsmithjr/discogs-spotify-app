import React from 'react';
import './Header.css';
// import logo from '../../images/discogifyLogo';

function Header() {

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" alt="Discogify logo" />
      </div>
      <div className="header__right">
        <h1 className="header__title">Discogify</h1>
      </div>
    </header>
  )
}

export default Header;