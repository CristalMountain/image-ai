import styled from 'styled-components';
import { Button } from './Auth.styled';

// Layout
export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background-color: #f8f9fa;
  box-sizing: border-box;
`;

export const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const AppTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const LogoutButton = styled(Button)`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: transparent;
  color: #555;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
`;

// Upload Section
export const SectionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
`;

export const UploadSection = styled(SectionCard)`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const FileLabel = styled.label`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px dashed #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #555;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: border-color 0.2s;

  &:hover:not(:disabled) {
    border-color: #4a90e2;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const UploadButton = styled(Button)`
  min-width: 120px;
`;

// Images Section
export const ImagesSection = styled(SectionCard)``;

export const ImageThumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const ImageThumbnail = styled.div`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ImageDescription = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
  text-align: center;
`;

export const NoContentMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #777;
  font-size: 1rem;
  width: 100%;
`; 