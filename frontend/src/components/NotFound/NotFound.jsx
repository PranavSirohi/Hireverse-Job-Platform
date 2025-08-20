import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notfound-container">
      <div className="notfound-content">
        <img src="/notfound.png" alt="Page Not Found" className="notfound-image" />
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-text">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="notfound-btn">
          Return to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
