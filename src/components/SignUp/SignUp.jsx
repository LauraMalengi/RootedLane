import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";



const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    // ✅ USE THIS CORRECT URL
    const response = await fetch('http://localhost:3000/api/users/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('✅ Account created successfully!');
      setFormData({ username: '', email: '', password: '' });
      // Optionally redirect to login page
      // window.location.href = '/LogIn';
    } else {
      setMessage(`❌ ${data.message}`);
    }
  } catch (error) {
    console.error('Signup error:', error);
    setMessage('❌ Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="signup-container">
      <div className="overlay-image"></div>

      <div className="overlay-form">
        <h2>Welcome to store</h2>
        <p className="subtitle">Sign up to create your account</p>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name" 
              required 
            />
          </div>

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
            {loading ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/LogIn">Log in</Link>
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

export default SignUp;