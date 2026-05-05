import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

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
      setLoading(false);
      return;
    }

    if (Object.keys(newErrors).length > 0 || Object.keys(errors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      setLoading(false);
      return;
    }

    // Simulate API call with async/await
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, you can store user data
      const userData = {
        email: formData.email,
        // Add any other user data you want to store
      };
      
      // You can store user data in localStorage or context here
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      setFormError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login-container"
    >
      <div className="login-box">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Welcome Back</h2>
          <p>Login to your Eco-Cart account</p>

          {formError && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="form-error"
            >
              {formError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="error"
                >
                  {errors.email}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error-input" : ""}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="error"
                >
                  {errors.password}
                </motion.span>
              )}
            </div>

            <div className="forgot-password">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className={loading ? "button-loading" : ""}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <p className="bottom-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {/* Add security note from teammate's code */}
          <div className="security-note">
            🔒 Your information is secure and encrypted
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;