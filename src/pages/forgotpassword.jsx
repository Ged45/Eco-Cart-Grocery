import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) return;

    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        {!submitted ? (
          <>
            <h2>Reset Password</h2>
            <p>Enter your email to receive reset instructions</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit">Send Reset Link</button>
            </form>
          </>
        ) : (
          <>
            <h2>Check Your Email</h2>
            <p>
              If your email is registered, you’ll receive a reset link shortly.
            </p>
          </>
        )}

        <p className="bottom-text">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;