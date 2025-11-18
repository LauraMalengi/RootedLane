import React, { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({ setUser }) => {  // ← Accept setUser prop from App.jsx
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // ← Add navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://44.223.38.245:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('✅ Login successful!');
        
        // Create user object
        const userData = {
          email: formData.email,
          name: data.user?.name || data.user?.username || formData.email.split('@')[0],
          token: data.token
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Update App state
        setUser(userData);
        
        // Redirect to home
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay-container">
      <div className="overlay-image"></div>

      <div className="overlay-form">
        <h2>Welcome Back to RootedLane</h2>
        <p className="subtitle">Log in to continue to your account</p>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password" 
                required 
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <br />

        <p className="muted">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="social-login">
          <p className="or-text">Or continue with</p>
          <br />
          <div className="social-buttons">
            <button type="button" className="social-button">
              <img src="/Images/google.png" alt="Google" /> Google
            </button>
            <button type="button" className="social-button">
              <img src="/Images/facebook.png" alt="Facebook" /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;