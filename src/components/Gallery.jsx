import React, { useState, useRef, useEffect } from "react";
import "../styles/Gallery.css";
import "../styles/App.css";
import galleryImages from "./importImages.js";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleModalClose = (event) => {
    if (event.target === modalRef.current) {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClose);

    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, []);

  return (
    <div className="gallery">
      {galleryImages.map((image, index) => (
        <div
          className="galleryImage"
          key={index}
          onClick={() => handleImageClick(image)}
        >
          <img className="shadow" src={image} alt={`gallery-image-${index}`} />
        </div>
      ))}
      {selectedImage && (
        <div className="galleryModal" ref={modalRef}>
          <div className="modalContent">
            <img src={selectedImage} alt="selected-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
