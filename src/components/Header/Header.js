import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  
  const navigate = useNavigate();
  
  function handleSearchClick() {
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" alt="Discogify logo" />
      </div>
      <div className="header__center">
        <h1 className="header__title">Discogify</h1>
      </div>
      <div className="header__right">
        <button onClick={handleSearchClick}><h3 className="header__about">User Search</h3></button>
      </div>
    </header>
  )
}

export default Header;