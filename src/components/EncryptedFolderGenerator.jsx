import React, { useState, useEffect } from "react";
import "../styles/EncryptedFolderGenerator.css";
import "../styles/App.css";

export default function EncryptedFolderGenerator() {
  const [drawing, setDrawing] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [randomString, setRandomString] = useState("");
  const [timer, setTimer] = useState(30);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    let interval;
    if (drawing) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [drawing, timer]);

  function handleMouseDown(e) {
    setDrawing(true);
    const canvas = document.getElementById("drawing-canvas");
    const canvasRect = canvas.getBoundingClientRect();
    setMouseX(e.clientX - canvasRect.left);
    setMouseY(e.clientY - canvasRect.top);
    setButtonDisabled(true);
  }

  function handleMouseMove(e) {
    if (!drawing) {
      return;
    }
    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#9DAD7F";
    ctx.lineWidth = 0.25 * 16;
    ctx.lineCap = "round";
    const canvasRect = canvas.getBoundingClientRect();
    ctx.moveTo(mouseX, mouseY);
    setMouseX(e.clientX - canvasRect.left);
    setMouseY(e.clientY - canvasRect.top);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }

  function handleMouseUp() {
    setDrawing(false);
    setButtonDisabled(false);
  }

  function generateRandomString() {
    if (timer === 0) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^*()<>?/\":';:_-";
      let randomChars = "";
      for (let i = 0; i < 30; i++) {
        const index = Math.floor(Math.random() * characters.length);
        const char = characters.charAt(index);
        randomChars += char;
      }
      setRandomString(randomChars);
    }
  }

  function resetTool() {
    setDrawing(false);
    setButtonDisabled(true);
    setTimer(30);
    setRandomString("");
    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleOverlayClick() {
    setShowOverlay(false);
  }

  function handleDrawingAreaClick() {
    if (!showOverlay) {
      return;
    }
    setShowOverlay(true);
  }

  return (
    <div className="FolderGeneratorToolContainer">
      {showOverlay && (
        <div className="FolderGeneratorToolOverlay">
          <div className="FolderGeneratorToolOverlayMessage">
            <p>
              This tool is for you to create a password encrypted folder for you
              to use on your computer. When drawing, please keep the mouse
              pressed for the full 30 seconds, while the password is being
              generated. If you don't, the timer will be reset and your password
              will not be generated until you do.
            </p>
            <button onClick={handleOverlayClick}>Use encryption tool</button>
          </div>
        </div>
      )}
      {!showOverlay && (
        <div
          className="FolderGeneratorToolInnerContainer"
          onClick={handleDrawingAreaClick}
        >
          <div
            className="FolderGeneratorToolDrawingContainer shadow"
            onMouseEnter={() => setTimer(30)}
            onMouseLeave={() => setDrawing(false)}
          >
            <canvas
              id="drawing-canvas"
              width="500"
              height="500"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
            <div className="FolderGeneratorToolCountdownTimer">{timer}s</div>
          </div>
          <div className="FolderGeneratorToolGenteratedDataContainer">
            <button
              onClick={generateRandomString}
              disabled={buttonDisabled || timer !== 0}
            >
              Generate Random String
            </button>
            {randomString && (
              <div>
                <div className="GeneratedRandomString">{randomString}</div>
                <button onClick={resetTool}>Reset Encryption Tool</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
