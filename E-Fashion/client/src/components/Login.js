import "./login.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      document.cookie = `token=${response.data.ticket}; path=/; SameSite=Lax`;
      setMessage("Login successful.");

      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.log(error);
      setMessage("Credentials did not match.");
    }
  };

  return (
    <div className="logincontainer">
      <form onSubmit={handleSubmit} className="signup-form">
        <Link to="/" className="navbar-logo">
          <img
            src={require("../assets/logo-png.png")}
            alt=""
            className="logo"
          />
          <span className="logo-name">M Fashion</span>
        </Link>
        <h2>Log In</h2>
        {message && <h4 style={{ color: "yellow" }}>{message}</h4>}
        <label className="signup-label">
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </label>
        <label className="signup-label">
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
        </label>
        <button type="submit" className="signup-button">
          Login
        </button>
        <div className="formLink">
          <Link to="/signup">
            <p>Sign Up</p>
          </Link>
        </div>
   
      </form>
    </div>
  );
}

export default Login;
