import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router
import './sign.css';

const Sign = () => {
  return (
    <div>
      <section className="login-register">
        <div className="section-container">
          <div className="login-register-section">
            <h2>Customer</h2>
            <p>Already a customer? Please login here.</p>
            <Link to="/loginC" className="btn btn-primary">
              Customer Login
            </Link>
            <p>New user? Register here.</p>
            <Link to="/registerC" className="btn btn-secondary">
              Customer Registration
            </Link>
          </div>

          <div className="login-register-section">
            <h2>Service Provider</h2>
            <p>Already a service provider? Please login here.</p>
            <Link to="/loginS" className="btn btn-primary">
              Service Provider Login
            </Link>
            <p>New user? Register here.</p>
            <Link to="/registerS" className="btn btn-secondary">
              Service Provider Registration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sign;
