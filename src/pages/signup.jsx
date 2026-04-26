import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  // Password strength
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

  // Validate field
  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "This field is required";
    } else {
      delete newErrors[name];
    }

    if (name === "email" && value && !value.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (name === "password" && value && value.length < 6) {
      newErrors.password = "At least 6 characters";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
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

    validate(name, value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");

    let newErrors = {};

    // Required field validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    // If all empty → stop early
    if (Object.values(formData).every((v) => !v)) {
      setErrors(newErrors);
      return;
    }

    // Combine validation errors
    if (Object.keys(newErrors).length > 0 || Object.keys(errors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setSuccessMessage("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <p>Join Eco-Cart for a better shopping experience</p>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
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
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
</div>
          {/* EMAIL */}
          <div className="form-group">
          <label className="input-label">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
</div>
          {/* PHONE */}
          <div className="form-group"> 
          <label className="input-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
</div>
          {/* PASSWORD */}
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
            onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && <span className="error">{errors.password}</span>}

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
</div>
          {/* CONFIRM PASSWORD */}
          <div className="form-group">
              <label className="input-label">Confirm Password</label>
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
</div>
          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading}>
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