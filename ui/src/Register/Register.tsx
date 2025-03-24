import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  SecondaryButton,
  LinkText,
  ErrorMessage,
  SuccessMessage,
  Spinner
} from "../components/styled/Auth.styled";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);
    
    try {
      const response = await API.post("/auth/register", {
        email,
        password,
      });
      
      if (response.status === 201 || response.data?.statusCode === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        console.error("Register failed:", response.data?.message);
        setError(response.data?.message || "Registration failed");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      const errorResponse = error as { response?: { data?: { message?: string } } };
      setError(errorResponse.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Create an Account</AuthTitle>
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
              disabled={isLoading || success}
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
              placeholder="Create a password"
              disabled={isLoading || success}
            />
          </FormGroup>
          <ButtonGroup>
            <PrimaryButton 
              type="submit" 
              disabled={isLoading || success}
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Register'}
            </PrimaryButton>
            <SecondaryButton 
              type="button" 
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              Back to Login
            </SecondaryButton>
          </ButtonGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Registration successful! Redirecting to login...</SuccessMessage>}
        </form>
        <AuthFooter>
          Already have an account? <LinkText onClick={() => navigate("/login")}>Sign in</LinkText>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;
