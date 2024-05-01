import React, { useState, useEffect } from "react";
import "../assets/stylings/Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  const handleRadioChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((dataItem, index) => (
          <Link
            to={dataItem.link ? dataItem.link : ""}
            target="_blank"
            key={index}
          >
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ display: index === currentIndex ? "block" : "none" }}
            >
              <img src={dataItem.image} alt={dataItem.name} />
            </div>
          </Link>
        ))}
      </div>
      <div className="carousel-navigation">
        {data.map((_, index) => (
          <input
            key={index}
            type="radio"
            name="carousel-navigation"
            checked={index === currentIndex}
            onChange={() => handleRadioChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
