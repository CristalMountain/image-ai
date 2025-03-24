import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import API from "../api/api";
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  AuthFooter,
  FormGroup,
  FormLabel,
  FormControl,
  ButtonGroup,
  PrimaryButton,
  LinkText,
  ErrorMessage,
  Spinner
} from "../components/styled/Auth.styled";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    setError("");
    event.preventDefault();
    setIsLoading(true);
    
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
    } catch (error: unknown) {
      console.error("Error:", error);
      const errorResponse = error as { response?: { data?: { message?: string } } };
      setError(errorResponse.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Sign In</AuthTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </FormGroup>
          <ButtonGroup>
            <PrimaryButton 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </PrimaryButton>
          </ButtonGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        <AuthFooter>
          Don't have an account? <LinkText onClick={() => navigate("/register")}>Sign up</LinkText>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
