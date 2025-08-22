import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1><Link to="/">Online store</Link></h1>
      <nav>
        <Link to="/cart">Shop cart</Link>
      </nav>
    </header>
  );
};

export default Header;