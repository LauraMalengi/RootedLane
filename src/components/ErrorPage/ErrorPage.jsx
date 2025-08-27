import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; 

const ErrorPage = () => {
  return (
    <div className="ErrorPage">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Go back to Homepage</Link>
    </div>
  );
};

export default ErrorPage;
