import React, { useState, useRef } from 'react';
import API from '../../api/api';
import { 
  UploadSection, 
  SectionTitle, 
  FileInputContainer, 
  FileInput, 
  FileLabel, 
  UploadButton
} from '../styled/Images.styled';
import { PrimaryButton, ErrorMessage, SuccessMessage, Spinner } from '../styled/Auth.styled';

interface ImageUploaderProps {
  onUploadSuccess: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        setUploadStatus("Only image files are allowed");
        setSelectedFile(null);
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        setUploadStatus("File size exceeds 2MB");
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus(undefined);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }
    
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await API.post("/s3/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("user") || ""}`,
        },
      });
      
      setUploadStatus("File uploaded successfully");
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
      
      onUploadSuccess();
      
      setTimeout(() => {
        setUploadStatus(undefined);
      }, 3000);
    } catch (error) {
      setUploadStatus("File upload failed");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <UploadSection>
      <SectionTitle>Upload a New Image</SectionTitle>
      <FileInputContainer>
        <FileInput 
          type="file" 
          id="file-upload" 
          onChange={handleFileChange}
          accept="image/*"
          ref={fileInputRef}
          disabled={isUploading}
        />
        <FileLabel htmlFor="file-upload" style={{ opacity: isUploading ? 0.7 : 1 }}>
          {selectedFile ? selectedFile.name : "Choose an image"}
        </FileLabel>
        <PrimaryButton 
          as={UploadButton}
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
        >
          {isUploading && <Spinner />}
          {isUploading ? 'Uploading...' : 'Upload'}
        </PrimaryButton>
      </FileInputContainer>
      {uploadStatus && (
        uploadStatus.includes("success") 
          ? <SuccessMessage>{uploadStatus}</SuccessMessage> 
          : <ErrorMessage>{uploadStatus}</ErrorMessage>
      )}
    </UploadSection>
  );
};

export default ImageUploader; 