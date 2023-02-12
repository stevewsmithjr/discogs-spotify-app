import React from 'react';
import './Header.css';

function Header() {

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" alt="Discogify logo" />
      </div>
      <div className="header__center">
        <h1 className="header__title">Discogify</h1>
      </div>
      <div className="header__right">
        <h3 className="header__about">About</h3>
      </div>
    </header>
  )
}

export default Header;