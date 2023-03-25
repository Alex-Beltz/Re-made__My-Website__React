// import React, { useState } from "react";
// import pdfjsLib from "pdfjs-dist";
// import "../styles/App.css";
// import "../styles/test.css";

// export default function Test() {
//   const [audioData, setAudioData] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [language, setLanguage] = useState("");

//   const handleFileDrop = async (event) => {
//     event.preventDefault();

//     if (!language) {
//       alert("Please choose a language");
//       return;
//     }

//     const file = event.dataTransfer.files[0];

//     console.log(file);

//     if (!file.type.startsWith("application/pdf")) {
//       alert("Please drop a PDF file");
//       return;
//     }

//     const pdfData = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//     const numPages = pdf.numPages;

//     let text = "";
//     for (let i = 1; i <= numPages; i++) {
//       const page = await pdf.getPage(i);
//       const pageText = await page.getTextContent();
//       text += pageText.items.map((item) => item.str).join(" ");
//       setProgress((i / numPages) * 100); // Update progress percentage
//     }

//     const audioBlob = await textToSpeech(text);
//     setAudioData(audioBlob);
//     setProgress(0); // Reset progress percentage
//   };

//   const handleDownload = () => {
//     if (audioData) {
//       const url = URL.createObjectURL(audioData);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "audio.mp3";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const textToSpeech = async (text) => {
//     const params = new URLSearchParams({
//       text: text,
//       voice: `en-US-${language}-Neural`,
//       format: "audio-24khz-48kbitrate-mono-mp3",
//     });
//     const res = await fetch(
//       `https://speech.platform.bing.com/synthesize?${params.toString()}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/ssml+xml",
//           "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
//           Authorization: "Bearer <YOUR_API_KEY>",
//         },
//       }
//     );
//     if (!res.ok) {
//       throw new Error(`Failed to synthesize speech: ${res.statusText}`);
//     }
//     const audioBlob = await res.blob();
//     return audioBlob;
//   };

import React, { useState } from "react";
import pdfjsLib from "pdfjs-dist/webpack";
import "../styles/App.css";
import "../styles/test.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.js";

export default function Test() {
  const [audioData, setAudioData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("");

  const handleFileDrop = async (event) => {
    event.preventDefault();

    if (!language) {
      alert("Please choose a language");
      return;
    }

    const file = event.dataTransfer.files[0];

    console.log(file);

    if (!file.type.startsWith("application/pdf")) {
      alert("Please drop a PDF file");
      return;
    }

    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const numPages = pdf.numPages;

    let text = "";
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await page.getTextContent();
      text += pageText.items.map((item) => item.str).join(" ");
      setProgress((i / numPages) * 100); // Update progress percentage
    }

    const audioBlob = await textToSpeech(text);
    setAudioData(audioBlob);
    setProgress(0); // Reset progress percentage
  };

  const handleDownload = () => {
    if (audioData) {
      const url = URL.createObjectURL(audioData);
      const link = document.createElement("a");
      link.href = url;
      link.download = "audio.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const textToSpeech = async (text) => {
    const params = new URLSearchParams({
      text: text,
      voice: `en-US-${language}-Neural`,
      format: "audio-24khz-48kbitrate-mono-mp3",
    });
    const res = await fetch(
      `https://speech.platform.bing.com/synthesize?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          Authorization: "Bearer <YOUR_API_KEY>",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to synthesize speech: ${res.statusText}`);
    }
    const audioBlob = await res.blob();
    return audioBlob;
  };

  return (
    <div className="pdfToVoiceToolContainer">
      <div className="languageSelect">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          style={{ padding: "1.5rem", fontSize: "1.25rem" }}
        >
          <option value="" disabled>
            Please choose a language
          </option>
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Español (España)</option>
          <option value="fr-FR">Français (France)</option>
          <option value="de-DE">Deutsch (Deutschland)</option>
        </select>
      </div>
      <div
        className="pdfDropBox shadow"
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {audioData ? (
          <>
            <p className="pdfDropBoxText">Conversion complete</p>
            <button onClick={handleDownload}>Download audio</button>
          </>
        ) : (
          <>
            <p className="pdfDropBoxText">
              Drag a PDF file here to convert to voice
            </p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="pdfDropBoxText">{Math.round(progress)}% complete</p>
          </>
        )}
        {!window.speechSynthesis ? (
          <p className="pdfDropBoxText">Speech synthesis not supported</p>
        ) : null}
      </div>
    </div>
  );
}
