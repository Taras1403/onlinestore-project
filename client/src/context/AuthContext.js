import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    setIsLoggedIn(!!token);
    if (token) {
      const fakeUser = {
        name: 'User',
        image: './images/user.svg'
      };
      setUser(fakeUser);
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};