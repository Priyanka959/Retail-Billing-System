import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent page refresh
    registerUser({ username, password, role })
      .then(() => {
        alert("Registration successful!");
        navigate("/");
      })
      .catch(() => alert("Registration failed!"));
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">Create your account</p>
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <input className="register-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className="register-input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
