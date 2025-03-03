import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import API from "../api/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    setError("");
    event.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      const data = response.data;
      if (data.token) {
        login(data.token);
        navigate("/images");
      } else {
        console.error("Login failed:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginRight: "1em" }} type="submit">
          Login
        </button>
        <button onClick={() => navigate("/register")}>Register</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default Login;
