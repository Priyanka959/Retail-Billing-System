import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ username, password });
      alert(response.data);
      navigate("/customer"); // Redirect to customer form after login
    } catch (error) {
      setError("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <div className="login-container">
    <div className="login-header">
      <h1 className="login-title">WELCOME TO BILLING SYSTEM</h1>
      <p className="login-subtitle">Login to access your retail billing system</p>
    </div>
  
    {error && <div className="error-message">{error}</div>}
  
    <div className="login-form">
      <input
        type="text"
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button 
        className="login-button" 
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  
    <div className="login-footer">
      Don't have an account?{' '}
      <span className="login-link" onClick={handleRegisterRedirect}>
        Register here
      </span>
    </div>
  </div>
  );
};

export default LoginPage;
