import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [formError, setFormError] = useState("");

  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (name === "email") {
      if (!value.includes("@")) {
        newErrors.email = "Enter a valid email";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        newErrors.password = "At least 6 characters";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validate(name, value);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  setFormError("");

  let newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  }

  if (Object.values(formData).every((v) => !v)) {
    setFormError("Please fill in your email and password");
    setErrors(newErrors);
    return;
  }

  if (Object.keys(newErrors).length > 0 || Object.keys(errors).length > 0) {
    setErrors({ ...errors, ...newErrors });
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    navigate("/");
  }, 1000);
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Login to your Eco-Cart account</p>
{formError && (
  <div className="form-error">
    {formError}
  </div>
)}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
</div>
<div className="form-group">
            <label className="input-label">Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
</div>
          <div className="forgot-password">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="bottom-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;