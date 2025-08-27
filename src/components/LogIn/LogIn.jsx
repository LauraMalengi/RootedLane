import React from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";

const LogIn = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="overlay-container">
      <div className="overlay-image"></div>

      <div className="overlay-form">
        <h2>Welcome Back</h2>
        <p className="subtitle">Log in to continue to your account</p>

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button className="btn-primary" type="submit">
            Log In
          </button>
        </form>

        <p className="muted">
          Don’t have an account? <Link to="/signup">Sign up</Link>
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

