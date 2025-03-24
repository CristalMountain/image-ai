import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../Auth/AuthProvider";
import ImageUploader from "../components/Images/ImageUploader";
import ImageGallery from "../components/Images/ImageGallery";
import { 
  AppContainer, 
  AppHeader, 
  AppTitle, 
  LogoutButton 
} from "../components/styled/Images.styled";

interface Image {
  id: string;
  userId: string;
  s3Url: string;
  description: string;
}

const Images: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const { logout } = useAuth();

  const handleGetAllImages = async () => {
    try {
      const response = await API.get("/s3/images", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user") || ""}`,
        },
      });

      setImages(response.data.images || []);
    } catch (error) {
      console.error(error);
      setImages([]);
    }
  };

  useEffect(() => {
    handleGetAllImages();
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <AppTitle>Image Gallery</AppTitle>
        <LogoutButton onClick={() => logout()}>
          Logout
        </LogoutButton>
      </AppHeader>
      
      <ImageUploader onUploadSuccess={handleGetAllImages} />
      <ImageGallery images={images} />
    </AppContainer>
  );
};

export default Images;
