import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await API.post("/auth/register", {
        email,
        password,
      });
      const { data } = await response;
      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Register failed:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
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
      <h2>Register</h2>
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
          Register
        </button>
        <button onClick={() => navigate("/login")}>Cancel</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default Register;
