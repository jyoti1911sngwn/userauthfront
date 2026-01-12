import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const DashboardGoogle = () => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    const decoded = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(decoded));
    setUser(decoded);
    window.history.replaceState({}, document.title, "/auth-success");
  } else {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }
}, []);


  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Signed in with Google</h2>

        <p style={styles.text}>
          You have successfully signed in using your Google account.
        </p>

        <div style={styles.info}>
          <div>
            <span style={styles.label}>Name</span>
            <span style={styles.value}>{user.name}</span>
          </div>

          <div>
            <span style={styles.label}>Email</span>
            <span style={styles.value}>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "12px",
    color: "#222",
  },
  text: {
    color: "#555",
    marginBottom: "24px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#888",
  },
  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
};

export default DashboardGoogle;
