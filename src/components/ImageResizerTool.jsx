// import React, { useState } from "react";
// import "../styles/ImageResizerTool.css";
// import "../styles/App.css";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// export default function ImageResizerTool() {
//   const [images, setImages] = useState([]);
//   const [resizedImages, setResizedImages] = useState([]);
//   const [resizeOption, setResizeOption] = useState("100x100");

//   const handleFileDrop = async (event) => {
//     event.preventDefault();
//     const files = Array.from(event.dataTransfer.files);
//     await handleFiles(files);
//   };

//   const handleFileInputChange = async (event) => {
//     const files = Array.from(event.target.files);
//     await handleFiles(files);
//   };

//   const handleFiles = async (files) => {
//     const newImages = await Promise.all(
//       files
//         .filter((file) => file.type.startsWith("image/"))
//         .map(async (file) => {
//           const dataUrl = await readFileAsDataURL(file);
//           return { name: file.name, dataUrl };
//         })
//     );
//     setImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   const handleImageResize = async () => {
//     const resized = await Promise.all(
//       images.map(async (image) => {
//         const [width, height] = resizeOption.split("x").map(Number);
//         const canvas = document.createElement("canvas");
//         canvas.width = width;
//         canvas.height = height;
//         const context = canvas.getContext("2d");
//         const img = await createImage(image.dataUrl);
//         context.drawImage(img, 0, 0, width, height);
//         const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // set to JPEG format with quality of 80%
//         const nameParts = image.name.split(".");
//         const extension = nameParts.pop();
//         const name = nameParts.join("_") + "_" + resizeOption + "." + extension;
//         const resizedBlob = await dataURLToBlob(resizedDataUrl);
//         return { name, blob: resizedBlob, previewUrl: resizedDataUrl };
//       })
//     );
//     setResizedImages(resized);
//   };

//   const handleDownload = async () => {
//     const zip = new JSZip();
//     resizedImages.forEach((resizedImage) => {
//       zip.file(resizedImage.name, resizedImage.blob);
//     });
//     const blob = await zip.generateAsync({ type: "blob" });
//     saveAs(blob, "resized_images.zip");
//     setImages([]);
//     setResizedImages([]);
//     setResizeOption("100x100"); // reset resize option to default
//   };

//   const readFileAsDataURL = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => resolve(event.target.result);
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const createImage = (src) => {
//     return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.onload = () => resolve(image);
//       image.onerror = (error) => reject(error);
//       image.src = src;
//     });
//   };

//   const dataURLToBlob = (dataUrl) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", dataUrl, true);
//       xhr.responseType = "blob";
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           resolve(xhr.response);
//         } else {
//           reject(new Error("Failed to convert data URL to blob"));
//         }
//       };
//       xhr.onerror = () => {
//         reject(new Error("Failed to convert data URL to blob"));
//       };
//       xhr.send();
//     });
//   };

//   return (
//     <div className="imageResizerContainer">
//       {/* <header>Drop or upload images here</header> */}
//       <div className="imageResizerRow">
//         <div className="thumbnailsContainer shadow">
//           <div style={{ fontWeight: "bold" }}>Selected Images:</div>
//           <div className="thumbnailsList">
//             {images.map((image) => (
//               <div className="thumbnailItem shadow" key={image.name}>
//                 <img src={image.dataUrl} alt={image.name} />
//                 {/* <div className="thumbnailItemName">{image.name}</div> */}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="imageDropBoxContainer">
//           <div className="dropAreaText">
//             <div>Drag and drop images below, or</div>

//             <label className="fileInputButton">
//               <input
//                 className=""
//                 type="file"
//                 onChange={handleFileInputChange}
//                 multiple
//               />
//               {/* Upload Images */}
//             </label>
//           </div>
//           <div
//             className="imageDropBox shadow"
//             onDragOver={(event) => event.preventDefault()}
//             onDrop={handleFileDrop}
//           >
//             <div className="imageDropBoxInner">
//               {resizedImages.length > 0 && (
//                 <div className="resizedImagesCont">
//                   <div>Resized Images:</div>
//                   <button onClick={handleDownload}>
//                     Download my resized images
//                   </button>
//                 </div>
//               )}
//               <div className="resizeOptionsCont">
//                 <div>Select resize option:</div>
//                 <select
//                   value={resizeOption}
//                   onChange={(event) => setResizeOption(event.target.value)}
//                 >
//                   <option value="100x100">100x100</option>
//                   <option value="150x300">150x300</option>
//                   <option value="300x500">300x500</option>
//                 </select>
//                 <button onClick={handleImageResize}>Resize images</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "../styles/ImageResizerTool.css";
import "../styles/App.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function ImageResizerTool() {
  const [images, setImages] = useState([]);
  const [resizedImages, setResizedImages] = useState([]);
  const [resizeOption, setResizeOption] = useState("100x100");

  const handleFileDrop = async (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    const newImages = await Promise.all(
      files
        .filter((file) => file.type.startsWith("image/"))
        .map(async (file) => {
          const dataUrl = await readFileAsDataURL(file);
          return { name: file.name, dataUrl };
        })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageResize = async () => {
    const resized = await Promise.all(
      images.map(async (image) => {
        const [width, height] = resizeOption.split("x").map(Number);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        const img = await createImage(image.dataUrl);
        context.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // set to JPEG format with quality of 80%
        const nameParts = image.name.split(".");
        const extension = nameParts.pop();
        const name = nameParts.join("_") + "_" + resizeOption + "." + extension;
        const resizedBlob = await dataURLToBlob(resizedDataUrl);
        return { name, blob: resizedBlob, previewUrl: resizedDataUrl };
      })
    );
    setResizedImages(resized);
  };

  // const handleDownload = async () => {
  //   const zip = new JSZip();
  //   resizedImages.forEach((resizedImage) => {
  //     zip.file(resizedImage.name, resizedImage.blob);
  //   });
  //   const blob = await zip.generateAsync({ type: "blob" });
  //   saveAs(blob, "resized_images.zip");
  //   setImages([]);
  //   setResizedImages([]);
  //   setResizeOption("100x100"); // reset resize option to default
  // };

  // const resetTool = () => {
  //   setImages([]);
  //   setResizedImages([]);
  //   setResizeOption("100x100");
  // };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const createImage = (src) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = src;
    });
  };

  const dataURLToBlob = (dataUrl) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", dataUrl, true);
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error("Failed to convert data URL to blob"));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Failed to convert data URL to blob"));
      };
      xhr.send();
    });
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    resizedImages.forEach((resizedImage) => {
      zip.file(resizedImage.name, resizedImage.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "resized_images.zip");
    resetTool();
  };

  const resetTool = () => {
    setImages([]);
    setResizedImages([]);
    setResizeOption("100x100");
  };

  return (
    <div className="imageResizerContainer">
      {/* <header>Drop or upload images here</header> */}
      <div className="imageResizerRow">
        <div className="thumbnailsContainer shadow">
          <div style={{ fontWeight: "bold" }}>Selected Images:</div>
          <div className="thumbnailsList">
            {images.map((image) => (
              <div className="thumbnailItem shadow" key={image.name}>
                <img src={image.dataUrl} alt={image.name} />
                {/* <div className="thumbnailItemName">{image.name}</div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="imageDropBoxContainer">
          <div className="dropAreaText">
            <div>Drag and drop images below, or</div>

            <label className="fileInputButton">
              <input
                className=""
                type="file"
                onChange={handleFileInputChange}
                multiple
              />
              {/* Upload Images */}
            </label>
          </div>
          <div
            className="imageDropBox shadow"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleFileDrop}
          >
            <div className="imageDropBoxInner">
              {resizedImages.length > 0 && (
                <div className="resizedImagesCont">
                  <div>Resized Images:</div>
                  <button onClick={handleDownload}>
                    Download my resized images
                  </button>
                </div>
              )}
              <div className="resizeOptionsCont">
                <div>Select resize option:</div>
                <select
                  value={resizeOption}
                  onChange={(event) => setResizeOption(event.target.value)}
                >
                  <option value="100x100">100x100</option>
                  <option value="150x300">150x300</option>
                  <option value="300x500">300x500</option>
                </select>
                <button onClick={handleImageResize}>Resize images</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
