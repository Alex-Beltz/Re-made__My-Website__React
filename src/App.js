import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Portfolio from "./components/Portfolio";
import WorkHistory from "./components/WorkHistory";
import Gallery from "./components/Gallery";
import ImageResizerTool from "./components/ImageResizerTool";
// import PdfToVoiceTool from "./components/PdfToVoiceTool";
// import CryptoQuotes from "./components/CryptoQuotes";
import PreciousMetalQuotes from "./components/PreciousMetalQuotes";
// import Test from "./components/test";
import RandomPasswordGenerator from "./components/RandomPasswordGenerator";

//sidebar icons
// import CryptoQuotesIcon from "./icons/CryptoQuotes.png";
import RandomPasswordGeneratorIcon from "./icons/CryptoQuotes.png";
import GalleryIcon from "./icons/Gallery.png";
import ImageResizerToolIcon from "./icons/ImageResizerTool.png";
// import PdfToVoiceToolIcon from "./icons/PdfToVoiceTool.png";
import portfolioIcon from "./icons/portfolio.png";
import PreciousMetalQuotesIcon from "./icons/PreciousMetalQuotes.png";
// import TimeZoneCalculatorIcon from "./icons/TimeZoneCalculator.png";
import WorkHistoryIcon from "./icons/WorkHistory.png";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarWidth = sidebarOpen ? "40%" : "12%";
  const contentWidth = sidebarOpen ? "88%" : "88%";

  const sidebarListItemStyle = {
    justifyContent: sidebarOpen ? "space-between" : "center",
    padding: sidebarOpen ? "1.75rem" : "0",
  };

  const sidebarSize = {
    width: sidebarWidth,
  };
  const contentSize = {
    width: contentWidth,
  };
  const overlaySize = {
    display: sidebarOpen ? "block" : "none",
  };

  const iconSize = {
    height: "2.5rem",
    width: "2.5rem",
  };

  const components = {
    portfolio: <Portfolio />,
    workhistory: <WorkHistory />,
    gallery: <Gallery />,
    imageresizertool: <ImageResizerTool />,
    // pdftovoicetool: <PdfToVoiceTool />,
    // cryptoquotes: <CryptoQuotes />,
    randompasswordgenerator: <RandomPasswordGenerator />,
    preciousmetalsquotes: <PreciousMetalQuotes />,
    // test: <Test />,
  };

  const icons = [
    { name: "Portfolio", icon: portfolioIcon },
    { name: "Work History", icon: WorkHistoryIcon },
    { name: "Gallery", icon: GalleryIcon },
    { name: "Image Resizer Tool", icon: ImageResizerToolIcon },
    // { name: "PDF to Voice Tool", icon: PdfToVoiceToolIcon },
    // { name: "Crypto Quotes", icon: CryptoQuotesIcon },
    { name: "Random Password Generator", icon: RandomPasswordGeneratorIcon },
    { name: "Precious Metals Quotes", icon: PreciousMetalQuotesIcon },
    // { name: "Encrypted Folder Generator", icon: PreciousMetalQuotesIcon },
    // { name: "Test", icon: TimeZoneCalculatorIcon },
  ];

  const handleClick = (componentName) => {
    setActiveComponent(components[componentName]);
  };

  return (
    <div className="App">
      <div className="sidebar sidebarStyle" style={sidebarSize}>
        <button onClick={toggleSidebar}>Menu</button>
        <ul className="sidebarListStyle">
          {icons.map((icon) => (
            <li
              key={icon.name}
              className="sidebarListItemStyle"
              onClick={() =>
                handleClick(icon.name.toLowerCase().replace(/\s+/g, ""))
              }
              style={sidebarListItemStyle}
            >
              {sidebarOpen ? (
                <React.Fragment>
                  <img src={icon.icon} alt={icon.name} style={iconSize} />
                  <span style={{ transitionDelay: "0.4s" }}>{icon.name}</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img src={icon.icon} alt={icon.name} style={iconSize} />
                  <span className="sidebarListItemTooltip">{icon.name}</span>
                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="content contentStyle" style={contentSize}>
        {activeComponent || <h1>Welcome to my app!</h1>}
      </div>
      <div
        className="overlay overlayStyle"
        style={overlaySize}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}
export default App;
