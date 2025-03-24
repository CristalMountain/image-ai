import React, { useState } from 'react';
import API from '../../api/api';
import { 
  ImagesSection,
  ImageThumbnails,
  ImageThumbnail,
  ImagePreview,
  PreviewImage,
  ImageDescription,
  NoContentMessage
} from '../styled/Images.styled';

interface Image {
  id: string;
  userId: string;
  s3Url: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageDescription, setImageDescription] = useState<string>("");

  const fetchPresignedUrl = async (image: Image) => {
    try {
      const path = new URL(image.s3Url).pathname.replace("/", "");
      const { data } = await API.get(`/s3/image?filename=${path}`);
      setImageUrl(data.url);
      const img = new Image();
      img.onload = () => {
        setImageDescription(image.description);
      };
      img.src = data.url;
    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
    }
  };

  return (
    <ImagesSection>
      {images && images.length > 0 ? (
        <>
          <ImageThumbnails>
            {images.map((image: Image, index: number) => (
              <ImageThumbnail
                key={image.id}
                onClick={() => fetchPresignedUrl(image)}
              >
                Image #{index + 1}
              </ImageThumbnail>
            ))}
          </ImageThumbnails>
          
          {imageUrl ? (
            <ImagePreview>
              <PreviewImage src={imageUrl} alt="Selected" />
              <ImageDescription>{imageDescription}</ImageDescription>
            </ImagePreview>
          ) : (
            <NoContentMessage>
              Click on an image thumbnail to view it
            </NoContentMessage>
          )}
        </>
      ) : (
        <NoContentMessage>
          No images uploaded yet. Upload your first image above.
        </NoContentMessage>
      )}
    </ImagesSection>
  );
};

export default ImageGallery; 