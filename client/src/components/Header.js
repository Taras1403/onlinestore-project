import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Pop-up menu
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);   // Pop-up menu
  };

  // Pop-up menu
  const handleAvatarClick = () => {    
    setIsMenuOpen(!isMenuOpen);        
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click was outside the menu container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setIsMenuOpen]);

  // Search
  const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header">
        <div className="logo-container">
          <Link to="/"><img src="./images/logo.svg" alt="Logo" className="logo-icon" /></Link>
          <h1><Link to="/">Online store</Link></h1>
        </div>
        <nav>
          {isSearchOpen ? (
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
            ) : (
                <img src="./images/search.svg" alt="Пошук" className="search-icon" onClick={handleSearchClick}/>
            )}

          <Link to="/"><img src="./images/question.svg" alt="Question" className="question-icon" /></Link>
          <Link to="/cart"><img src="./images/shop.svg" alt="Shop Cart" className="cart-icon" /></Link>
          
          {user ? (
            <div className="user-profile-container">
                <img src={user.image} alt="User Profile" className="user-avatar" onClick={handleAvatarClick} />
              {isMenuOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <Link to="/account" onClick={() => setIsMenuOpen(false)}>Account</Link>
                  <button onClick={handleLogout}>Exit</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </nav>
    </header>
  );
};

export default Header;