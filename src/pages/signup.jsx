import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password strength
  const getPasswordStrength = (password) => {
    if (!password) return { label: "", strength: 0 };

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", strength: 1 };
    if (strength === 2) return { label: "Medium", strength: 2 };
    if (strength === 3) return { label: "Good", strength: 3 };
    return { label: "Strong", strength: 4 };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Email validation regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate field
  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "This field is required";
    } else {
      delete newErrors[name];
    }

    if (name === "email" && value && !isValidEmail(value)) {
      newErrors.email = "Enter a valid email address";
    }

    if (name === "password" && value && value.length < 8) {
      newErrors.password = "At least 8 characters";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (name === "phone" && value && value.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      validate(name, value);
    } else {
      validate(name, value);
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        firstName: formData.fullName.split(' ')[0],
        lastName: formData.fullName.split(' ').slice(1).join(' ') || formData.fullName.split(' ')[0],
        signupDate: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      setSuccessMessage("Account created successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setSuccessMessage("");
      setErrors({ submit: "Failed to create account. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="signup-container"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="signup-box"
      >
        <h2>Create Account</h2>
        <p>Join Eco-Cart for a better shopping experience</p>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-message"
          >
            {successMessage}
          </motion.div>
        )}

        {/* SUBMIT ERROR */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="form-error"
          >
            {errors.submit}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div className="form-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={errors.fullName ? { borderColor: "#d32f2f" } : {}}
            />
            {errors.fullName && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.fullName}
              </motion.span>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              style={errors.email ? { borderColor: "#d32f2f" } : {}}
            />
            {errors.email && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.email}
              </motion.span>
            )}
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={errors.phone ? { borderColor: "#d32f2f" } : {}}
            />
            {errors.phone && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.phone}
              </motion.span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={errors.password ? { borderColor: "#d32f2f" } : {}}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.password}
              </motion.span>
            )}

            {/* STRENGTH METER */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="strength-meter"
              >
                <div className="strength-meter-bars">
                  <div
                    className={`strength-bar ${
                      passwordStrength.strength >= 1 ? "active" : ""
                    }`}
                  />
                  <div
                    className={`strength-bar ${
                      passwordStrength.strength >= 2 ? "active" : ""
                    }`}
                  />
                  <div
                    className={`strength-bar ${
                      passwordStrength.strength >= 3 ? "active" : ""
                    }`}
                  />
                  <div
                    className={`strength-bar ${
                      passwordStrength.strength >= 4 ? "active" : ""
                    }`}
                  />
                </div>
                <span className={`strength-text strength-${passwordStrength.strength}`}>
                  Password Strength: {passwordStrength.label}
                  {passwordStrength.label === "Weak" && " 🔒"}
                  {passwordStrength.label === "Medium" && " 👍"}
                  {passwordStrength.label === "Good" && " 💪"}
                  {passwordStrength.label === "Strong" && " 🔐"}
                </span>
              </motion.div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label className="input-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={errors.confirmPassword ? { borderColor: "#d32f2f" } : {}}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.confirmPassword}
              </motion.span>
            )}
          </div>

          {/* TERMS AND CONDITIONS */}
          <div className="terms-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: "" }));
                  }
                }}
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="terms-link">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-text"
              >
                {errors.terms}
              </motion.span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {/* Security note */}
        <div className="security-note">
          🔒 Your information is secure and encrypted
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Signup;