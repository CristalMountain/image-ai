import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../Auth/AuthProvider";

interface Image {
  id: string;
  userId: string;
  s3Url: string;
  description: string;
}

const Images: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadBtn, setUploadBtn] = useState<string>("Upload");
  const [images, setImages] = useState<Image[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageDescription, setImageDescription] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string | undefined>(
    undefined
  );
  const { logout } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus("File size exceeds 5MB");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      setUploadBtn("Upload");
      return;
    }
    setUploadBtn("Uploading...");

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
      setUploadBtn("Uploaded");
      setTimeout(() => {
        setUploadStatus(undefined);
        setUploadBtn("Upload");
      }, 3000);
      handleGetAllImages();
    } catch (error) {
      setUploadStatus("File upload failed");
      setUploadBtn("Upload");
      console.error(error);
    }
  };

  const handleGetAllImages = async () => {
    try {
      const response = await API.get("/s3/images", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user") || ""}`,
        },
      });

      setImages(response.data.images);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    handleGetAllImages();
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto 50%",
          position: "absolute",
          top: "5%",
          transform: "translateX(-50%)",
        }}
      >
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>{uploadBtn}</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        {!imageUrl &&
          images?.length &&
          "To see the images, click on the image number below."}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: "20%",
          margin: "auto 50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        {images?.map((image: Image, index: number) => (
          <div
            style={{ marginRight: "2em", cursor: "pointer" }}
            key={image.id}
            onClick={() => fetchPresignedUrl(image)}
          >
            IMAGE #{index + 1}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: "30%",
          width: "50%",
          margin: "auto 50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <img style={{ width: "50%" }} src={imageUrl} />
        <p>{imageDescription}</p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
        }}
      >
        <button onClick={() => logout()}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Images;
