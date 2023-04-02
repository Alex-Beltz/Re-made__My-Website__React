import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/PasswordGenerator.css";
import "../styles/App.css";

export default function PasswordGenerator() {
  const [drawing, setDrawing] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [timer, setTimer] = useState(30);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

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

  const handleMouseMove = useCallback(
    (e) => {
      if (drawing) {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const canvasRect = canvas.getBoundingClientRect();
        let x = e.clientX - canvasRect.left;
        let y = e.clientY - canvasRect.top;
        if (x < 0) {
          x = 0;
        } else if (x > canvas.width) {
          x = canvas.width;
        }
        if (y < 0) {
          y = 0;
        } else if (y > canvas.height) {
          y = canvas.height;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    },
    [drawing]
  );

  const handleMouseUp = useCallback(() => {
    setDrawing(false);
    setButtonDisabled(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    if (drawing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drawing, handleMouseMove, handleMouseUp]);

  function handleMouseDown(e) {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; // Store the canvas context in the ref

    ctx.lineWidth = 5; // Set the line width for drawing
    ctx.lineJoin = "round"; // Set the line join style
    ctx.lineCap = "round"; // Set the line cap style

    const canvasRect = canvas.getBoundingClientRect();
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;

    ctx.beginPath(); // Start a new path for drawing
    ctx.moveTo(x, y); // Move the starting point to the current coordinates

    setButtonDisabled(true);
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
      setButtonDisabled(true);
    }
  }

  function resetTool() {
    setDrawing(false);
    setButtonDisabled(true);
    setTimer(30);
    setRandomString("");
    const canvas = canvasRef.current;
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
    <div className="PWToolContainer">
      {showOverlay && (
        <div className="PWToolOverlay">
          <div className="PWToolOverlayMessage">
            <p>
              This tool is for you to create a password encrypted folder for you
              to use on your computer. When drawing, please keep the mouse
              pressed for the full 30 seconds, while the password is being
              generated. If you don't, the timer will be reset and your password
              will not be generated until you do. With the character set and
              length of password being 30 chars., there are approximately 98
              octillion (or 98 billion billion billion) possible combinations,
              one of which will be randomly generated as yours.
            </p>
            <button onClick={handleOverlayClick}>Use encryption tool</button>
          </div>
        </div>
      )}
      {!showOverlay && (
        <div className="PWContainer" onClick={handleDrawingAreaClick}>
          <div
            className="PWToolDrawingContainer shadow"
            onMouseEnter={() => setTimer(30)}
            onMouseLeave={() => setDrawing(false)}
          >
            <canvas
              id="drawing-canvas"
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={handleMouseDown}
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: drawing ? "none" : "default" }}
            />
            <div className="PWToolCountdownTimer">{timer}s</div>
          </div>
          <div className="PWToolGenteratedDataContainer">
            <button
              onClick={generateRandomString}
              disabled={buttonDisabled || timer !== 0}
            >
              Generate Random Password
            </button>
            {randomString && (
              <div>
                <div className="GeneratedRandomString">{randomString}</div>
                <button onClick={resetTool}>Reset Password Tool</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

//
//
//
//
//
//
