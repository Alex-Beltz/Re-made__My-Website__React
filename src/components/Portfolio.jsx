import React from "react";
import "../styles/Portfolio.css";
import "../styles/App.css";
import SevenOSevenImg from "../portfolioImages/707.PNG";

const portfolioData = [
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
  {
    img: SevenOSevenImg,
    link: "https://www.707bali.com/",
    description: "Restaurant chain in Bali, Indonesia",
  },
];

export default function Portfolio() {
  return (
    <div className="portfolio">
      {portfolioData.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-item shadow"
        >
          <div
            className="portfolio-item-img"
            style={{
              backgroundImage: `url(${item.img})`,
            }}
          >
            <div className="portfolio-item-description">{item.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
