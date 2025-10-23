import React, { useState } from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";




const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      // ✅ FIXED: Changed to localhost and correct endpoint name
      const response = await fetch('http://localhost:3000/api/users/LogIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('✅ Login successful!');
        // Store user data in localStorage or context
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to dashboard or home page
        window.location.href = '/';
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
        <h2>Welcome Back</h2>
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
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required 
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="muted">
          Don't have an account? <Link to="/SignUp">Sign up</Link>
        </p>

        <div className="social-login">
          <p className="or-text">Or continue with</p>
          <div className="social-buttons">
            <button className="social-button">
              <img src="/Images/google.png" alt="Google" /> Google
            </button>
            <button className="social-button">
              <img src="/Images/facebook.png" alt="Facebook" /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;