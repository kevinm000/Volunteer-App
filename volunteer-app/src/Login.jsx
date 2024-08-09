import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitted(true);
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token, user } = response.data; // Expecting token and user data
      localStorage.setItem('token', token); // Save token in local storage
      login(user); // Store user data in context
      navigate('/'); // Redirect to Home page after successful login
    } catch (error) {
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <button type="submit" disabled={submitted}>Login</button>
      </form>
    </div>
  );
};

export default Login;
