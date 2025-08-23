import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Redirect to the home page
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();   // Redirect to the home page

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', formData);
      setMessage(res.data.message);
      if (res.status === 201) {  // Redirect to the home page
        navigate('/login');      // Redirect to the home page
      }                          // Redirect to the home page
    } catch (error) {
      setMessage(error.response.data.message || 'Registration error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;