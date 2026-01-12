import { useAuth0 } from "@auth0/auth0-react";
import React, {  useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear specific error
  };

  const validateInputs = () => {
    const newErrors = {};
    if (cred.name.length < 6)
      newErrors.name = "Name must be at least 6 characters.";
    if (cred.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await fetch(
        "https://userauthback-8kgy.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cred),
        }
      );
      const json = await response.json();
      if (json.success) setMessage("Successfully signed up! Please log in.");
      else setMessage(json.error || "Sign up failed! Please try again.");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "36px",
          borderRadius: "14px",
          backgroundColor: "#fff",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <nav
          style={{
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#667eea",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#667eea",
              fontWeight: 500,
            }}
          >
            Sign Up
          </Link>
        </nav>

        <h2 style={{ marginBottom: "24px", color: "#333", fontWeight: 600 }}>
          Create Account
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={cred.name}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={cred.email}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={cred.password}
            onChange={onChange}
            style={inputStyle}
          />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}
        </div>

        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            window.location.href = "https://userauthback-8kgy.onrender.com/google";
          }}
        >
          Sign Up With Google
        </button>

        {message && (
          <p
            style={{
              marginTop: "18px",
              fontSize: "14px",
              color: message.includes("Successfully") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s ease-in-out",
  marginBottom: "6px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#667eea",
  marginBottom: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "4px",
  textAlign: "left",
};

export default SignUp;
