import styled from 'styled-components';

// Auth Containers
export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 2.5rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
`;

export const AuthTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

export const AuthFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #666;
`;

// Form Elements
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

export const FormControl = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    outline: none;
  }

  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

// Buttons
export const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const PrimaryButton = styled(Button)`
  border: none;
  background-color: #4a90e2;
  color: white;

  &:hover:not(:disabled) {
    background-color: #3a7bc8;
  }
`;

export const SecondaryButton = styled(Button)`
  border: 1px solid #ddd;
  background-color: transparent;
  color: #555;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
`;

export const LinkText = styled.span`
  color: #4a90e2;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

// Messages
export const MessageBox = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
`;

export const ErrorMessage = styled(MessageBox)`
  background-color: #ffe8e8;
  color: #e53935;
`;

export const SuccessMessage = styled(MessageBox)`
  background-color: #e8f5e9;
  color: #43a047;
`;

// Spinner
export const ButtonWithSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s ease-in-out infinite;
  vertical-align: middle;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`; 