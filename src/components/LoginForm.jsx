import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const AuthForm = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useUser();

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
      const res = await axios.post(endpoint, payload, { withCredentials: true });
      setMessage(res.data.message || "Success!");

      // Login the user with the data from response
      const userData = {
        name: res.data.user?.name || (isLogin ? '' : name),
        email: res.data.user?.email || email,
        id: res.data.user?.id,
        token: res.data.token
      };
      
      login(userData);

      setTimeout(() => {
        onClose && onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
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

          {/* Updated actionRow layout based on login/signup */}
          <div
            style={{
              ...styles.actionRow,
              justifyContent: isLogin ? "space-between" : "center",
            }}
          >
            <button type="submit" style={styles.submitButton}>
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
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  container: {
    position: "relative",
    width: "90%",
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "25px",
    textAlign: "center",
    backgroundColor: "#2D3542",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "24px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
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
    border: "1px solid #888",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    width: "100%",
    boxSizing: "border-box",
  },
  actionRow: {
    display: "flex",
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