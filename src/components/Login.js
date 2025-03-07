import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signStyle.css";

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users"))|| [];
    const storedUser=storedUsers.find(
      (user)=>user.email===credentials.email && user.password===credentials.password
    )

    if (!storedUser) {
      alert("Invalid credentials! Please try again.");
      return;
    }

    alert("Login successful!");
    localStorage.setItem("isAuthenticated", "true"); // Store login status separately
    setIsAuthenticated(true);
    navigate("/persona");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="sign-button"type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
