import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://express-backend-5lzy.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cred),
        }
      );

      const json = await response.json();
      json.success
        ? setMessage("Successfully logged in!")
        : setMessage("Login failed! Please try again.");
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          padding: "32px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Welcome Back 👋
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={cred.email}
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={cred.password}
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        {message && (
          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              color: message.includes("Successfully") ? "green" : "red",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#667eea", textDecoration: "none", fontWeight: "500" }}
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#667eea",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
};

export default Login;
