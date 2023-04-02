import React, { useState } from "react";
import "./styles/App.css";
import Portfolio from "./components/Portfolio";
import CertTraining from "./components/CertTraining";
import CloudEngineering from "./components/CloudEngineering";

import WorkHistory from "./components/WorkHistory";
import Gallery from "./components/Gallery";
import RegExTool from "./components/RegExTool";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordManager from "./components/PasswordManager";
import ImageResizerTool from "./components/ImageResizerTool";
import TextToVoiceTool from "./components/TextToVoiceTool";
import PreciousMetalQuotes from "./components/PreciousMetalQuotes";
import TimeZoneCalculator from "./components/TimeZoneCalculator";
// import CryptoQuotes from "./components/CryptoQuotes";
// import Test from "./components/test";

//sidebar icons
import portfolioIcon from "./icons/portfolio.png";
import CertTrainingIcon from "./icons/CertTraining.png";
import CloudEngineeringIcon from "./icons/CloudEngineering.png";
import WorkHistoryIcon from "./icons/WorkHistory.png";
import GalleryIcon from "./icons/Gallery.png";
import RegExToolIcon from "./icons/RegExTool.png";
import PasswordGeneratorIcon from "./icons/CryptoQuotes.png";
import PasswordManagerIcon from "./icons/PasswordManager.png";
import ImageResizerToolIcon from "./icons/ImageResizerTool.png";
import TextToVoiceToolIcon from "./icons/TextToVoiceTool.png";
import PreciousMetalQuotesIcon from "./icons/PreciousMetalQuotes.png";
import TimeZoneCalculatorIcon from "./icons/TimeZoneCalculator.png";
// import CryptoQuotesIcon from "./icons/CryptoQuotes.png";

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
    certtraining: <CertTraining />,
    cloudengineering: <CloudEngineering />,
    workhistory: <WorkHistory />,
    gallery: <Gallery />,
    regextool: <RegExTool />,
    passwordgenerator: <PasswordGenerator />,
    passwordmanager: <PasswordManager />,
    imageresizer: <ImageResizerTool />,
    texttovoice: <TextToVoiceTool />,
    preciousmetalsquotes: <PreciousMetalQuotes />,
    timezonecalculator: <TimeZoneCalculator />,
    // cryptoquotes: <CryptoQuotes />,
    // test: <Test />,
  };

  const icons = [
    { name: "Portfolio", icon: portfolioIcon },
    { name: "Cert / Training", icon: CertTrainingIcon },
    { name: "Cloud Engineering", icon: CloudEngineeringIcon },
    { name: "Work History", icon: WorkHistoryIcon },
    { name: "Gallery", icon: GalleryIcon },
    { name: "RegEx Tool", icon: RegExToolIcon },
    { name: "Password Generator", icon: PasswordGeneratorIcon },
    { name: "Password Manager", icon: PasswordManagerIcon },
    { name: "Image Resizer", icon: ImageResizerToolIcon },
    { name: "Text To Voice", icon: TextToVoiceToolIcon },
    { name: "Precious Metals Quotes", icon: PreciousMetalQuotesIcon },
    { name: "Time Zone Calculator", icon: TimeZoneCalculatorIcon },
    // { name: "Crypto Quotes", icon: CryptoQuotesIcon },
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
                handleClick(icon.name.toLowerCase().replace(/[\s/_-]+/g, ""))
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
