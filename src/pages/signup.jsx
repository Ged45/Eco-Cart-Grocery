import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  // State
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

  // Password strength function
  const getPasswordStrength = (password) => {
    if (!password) return { label: "", strength: 0 };

    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", strength };
    if (strength === 2) return { label: "Medium", strength };
    return { label: "Strong", strength };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Validation
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

      // Re-check confirm password when password changes
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validate(name, value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Alert ONLY if entire form is empty
    if (Object.values(formData).every((v) => !v)) {
      alert("Please fill out the form");
      return;
    }

    // Block submission if errors or missing fields
    if (
      Object.keys(errors).length > 0 ||
      Object.values(formData).some((v) => !v)
    ) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <p>Join Eco-Cart for a better shopping experience</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* PASSWORD */}
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

          {/* PASSWORD HINT */}
          <small className="hint">
            Use at least 6 characters, including a number and uppercase letter
          </small>

          {/* STRENGTH METER */}
          {formData.password && (
            <div className="strength-meter">
              <div
                className={`strength-bar strength-${passwordStrength.strength}`}
              ></div>
              <span className="strength-text">
                {passwordStrength.label}
              </span>
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;