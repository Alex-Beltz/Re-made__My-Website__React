import React, { useState } from "react";
import "../styles/App.css";
import "../styles/PdfToVoiceTool.css";
import { saveAs } from "file-saver";
import { useSpeechSynthesis } from "react-speech-kit";
import { getDocument } from "pdfjs-dist";

export default function PdfToVoiceTool() {
  const [audioData, setAudioData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("");
  const { speak, voices } = useSpeechSynthesis();

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
    const pdf = await getDocument({ data: pdfData }).promise;
    const numPages = pdf.numPages;

    let text = "";
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await page.getTextContent();
      text += pageText.items.map((item) => item.str).join(" ");
      setProgress(((i + 1) / numPages) * 100); // Update progress percentage
    }

    const audioBlob = await textToSpeech(text);
    setAudioData(audioBlob);
    setProgress(0); // Reset progress percentage
  };

  const handleDownload = () => {
    if (audioData) {
      saveAs(audioData, "audio.mp3");
    }
  };

  const textToSpeech = async (text) => {
    return new Promise((resolve) => {
      const selectedVoice = voices.find((voice) => voice.lang === language);
      speak({
        text,
        voice: selectedVoice,
        onEnd: () => {
          resolve();
        },
      });
    });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="pdfToVoiceToolContainer">
      <div className="languageSelect">
        <select style={{ padding: "1.5rem", fontSize: "1.25rem" }}>
          <option value="" disabled selected>
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
        {!window.FoxitPDFSDK ? (
          <p className="pdfDropBoxText">Failed to load PDF SDK</p>
        ) : null}
      </div>
    </div>
  );
}
