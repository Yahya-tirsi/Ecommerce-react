import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [errorpassword, setErrorpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/", { state: res.data });
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 400:
            if (data.error.includes("User not found")) {
              setErroremail("Incorrect email!");
              setErrorpassword("");
            } else if (data.error.includes("Invalid password!")) {
              setErrorpassword("Incorrect password!");
              setErroremail("");
            } else {
              setError(
                "Invalid input. Please check your details and try again."
              );
            }
            break;
          default:
            setError("Registration failed. Please try again.");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Connexion</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          {erroremail && <p style={{ color: "red" }}>{erroremail}</p>}
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {errorpassword && <p style={{ color: "red" }}>{errorpassword}</p>}

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <p>
          I don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
