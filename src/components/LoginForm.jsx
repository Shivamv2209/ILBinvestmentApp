import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthForm = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Update the form mode when initialMode prop changes
  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:3000/api/user/login"
      : "http://localhost:3000/api/user/signup";

    try {
      const payload = isLogin ? { email, password } : { name, email, password };
      const res = await axios.post(
        endpoint,
        payload,
        { withCredentials: true }
      );
      setMessage(res.data.message || "Success!");
      // Close the form after successful login/signup after a short delay
      setTimeout(() => {
        onClose && onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLogin ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        
        <div style={styles.actionRow}>
          <button type="submit" style={styles.submitButton}>
            {isLogin && (
              <span style={styles.userIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            )}
            {isLogin ? "Log In" : "Sign Up"}
          </button>
          
          {isLogin && (
            <button type="button" style={styles.forgotButton}>
              Forgot Password
            </button>
          )}
        </div>
      </form>
      
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        style={styles.toggleButton}
      >
        {isLogin ? "Or Sign-up instead" : "Or Log-in instead"}
      </button>
      
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "25px",
    textAlign: "center",
    backgroundColor: "#2D3542",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "400",
    marginBottom: "30px",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px 20px",
    fontSize: "16px",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#E9E9E9",
    color: "#333",
    width: "100%",
    boxSizing: "border-box",
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  submitButton: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#3B4254",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },
  userIcon: {
    display: "flex",
    marginRight: "8px",
  },
  forgotButton: {
    background: "none",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "none",
    opacity: "0.8",
  },
  toggleButton: {
    marginTop: "25px",
    padding: "12px 30px",
    background: "#3B4254",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
    width: "auto",
    display: "inline-block",
  },
  message: {
    marginTop: "15px",
    color: "#FFD700",
  }
};

export default AuthForm;