import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin();
      navigate("/");
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgText}>BudgetMate</div>
      

      <div
        style={{
          ...styles.card,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, #1d60de, #d04646)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "2rem",
  },

  bgText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "clamp(6rem, 20vw, 12rem)",
    fontWeight: "900",
    color: "rgba(255, 255, 255, 0.1)",
    zIndex: 0,
    userSelect: "none",
    whiteSpace: "nowrap",
    textAlign: "center",
    letterSpacing: "4px",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
    maxWidth: "95vw",
    maxHeight: "90vh",
    lineHeight: 1,
    boxSizing: "border-box",
  },
card: {
  backgroundColor: "rgba(103, 92, 138, 0.85)",  // white with slight transparency
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",  // lighter shadow
  maxWidth: "400px",    // smaller width
  width: "90vw",
  height: "auto",       // height adjusts to content
  padding: "2.5rem 3rem",
  zIndex: 1,
  textAlign: "center",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
},

input: {
  width: "100%",
  padding: "0.9rem",
  margin: "0.75rem 0",
  borderRadius: "8px",
  border: "1.2px solid #bbb",
  fontSize: "16px",
  boxSizing: "border-box",
},

button: {
  width: "100%",
  padding: "1rem",
  background: "linear-gradient(135deg, #3a72f1, #b84848)",  // adjusted to blend with bg
  border: "none",
  color: "#fff",
  fontWeight: "700",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  marginTop: "1.8rem",
  transition: "background 0.3s ease",
},

};
