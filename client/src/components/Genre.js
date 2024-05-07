import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGenre from "../hooks/UseGenre";
import "../assets/stylings/Genre.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import FictionImg from "../assets/images/genres/fiction.png";
import FantasyImg from "../assets/images/genres/fantasy.png";
import SciFiImg from "../assets/images/genres/sciencefic.png";
import DystopianImg from "../assets/images/genres/dystopian.png";
import ActionImg from "../assets/images/genres/adventure.png";
import MysteryImg from "../assets/images/genres/mystery.png";
import HorrorImg from "../assets/images/genres/horror.png";
import HistoricalFicImg from "../assets/images/genres/historical fic.png";
import RomanceImg from "../assets/images/genres/romance.png";
import LgbtImg from "../assets/images/genres/lgbt.png";
import GraphicNovelImg from "../assets/images/genres/graphic novel.png";
import ShortStoryImg from "../assets/images/genres/shortstory.png";
import YoungAdultsImg from "../assets/images/genres/young adults.png";
import ChildrenImg from "../assets/images/genres/children.png";
import MemoirImg from "../assets/images/genres/Memoir-vs.-Autobiography.jpg";
import FoodImg from "../assets/images/genres/food.png";
import ArtImg from "../assets/images/genres/artphotography.png";
import SelfHelpImg from "../assets/images/genres/selfhelp.png";
import HistoryImg from "../assets/images/genres/history.png";
import TravelImg from "../assets/images/genres/travel.png";
import CrimeImg from "../assets/images/genres/crime-scene-with-tape-concept-il.png";
import HumorImg from "../assets/images/genres/funny.png";
import GuideImg from "../assets/images/genres/guide-howto.png";
import SpiritualityImg from "../assets/images/genres/sprituality.png";
import PhilosophyImg from "../assets/images/genres/philosophy.png";
import ParentingImg from "../assets/images/genres/parents-preparing-cute-daughter.png";
import ScienceImg from "../assets/images/genres/science-lab-objects_23-214848831.png";

const Genre = () => {
  const genreImages = {
    Fiction: FictionImg,
    Fantasy: FantasyImg,
    "Science Fiction": SciFiImg,
    Dystopian: DystopianImg,
    "Action & Adventure": ActionImg,
    Mystery: MysteryImg,
    Horror: HorrorImg,
    "Historical Fiction": HistoricalFicImg,
    Romance: RomanceImg,
    "LGBTQ+": LgbtImg,
    "Graphic Novel": GraphicNovelImg,
    "Short Story": ShortStoryImg,
    "Young Adult": YoungAdultsImg,
    "Children’s": ChildrenImg,
    "Memoir & Autobiography": MemoirImg,
    "Food & Drink": FoodImg,
    "Art & Photography": ArtImg,
    "Self-help": SelfHelpImg,
    History: HistoryImg,
    Travel: TravelImg,
    Crime: CrimeImg,
    Humor: HumorImg,
    "Guide and How-to ": GuideImg,
    "Religion & Spirituality": SpiritualityImg,
    "Humanities & Social Sciences": PhilosophyImg,
    "Parenting & Families": ParentingImg,
    "Science & Technology": ScienceImg,
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const genres = useGenre();

  useEffect(() => {
    const handleResize = () => {
      // Adjust items per page based on screen width
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setItemsPerPage(2);
      } else if (screenWidth < 768) {
        setItemsPerPage(3);
      } else if (screenWidth < 1026) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(6);
      }
    };

    // Call handleResize initially and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    const maxIndex = Object.keys(genreImages).length - 1;
    const newIndex = Math.min(startIndex + itemsPerPage, maxIndex);
    setStartIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(startIndex - itemsPerPage, 0);
    setStartIndex(newIndex);
  };
  const slicedGenres = genres.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="genre-container mx-3 w-full overflow-hidden">
      <div className="genre-list flex gap-5 items-center justify-center">
        {slicedGenres.map((c) => (
          <div
            className="genre flex flex-col  hover:text-pink-800"
            key={c.name}
          >
            <Link to={`/genre/${c.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="rounded-container">
                <img
                  className="genre-icon"
                  src={genreImages[c.name]}
                  alt={c.name}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.filter = "brightness(1.3)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.filter = "brightness(1)")
                  }
                />
              </div>
              <div className="bebas text-xl genre-name">{c.name}</div>
            </Link>
          </div>
        ))}
      </div>
      <div className="navigation flex justify-between">
        <button className="arrow-btn mr-2" onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="arrow-btn" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Genre;
