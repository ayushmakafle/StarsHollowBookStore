import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import "../../assets/stylings/LandingPage.css";
import Carousel from "../Carousel";
import Genre from "../Genre";

import HiringImg from "../../assets/images/Graphic Designer.png";
import JoinBookClubImg from "../../assets/images/bookclub.png";
import VisitUsImg from "../../assets/images/visitus.png";
import GenreImg from "../../assets/images/book-genres-1024x914.png";
import BookImg from "../../assets/images/top-10-books-every-college-student-read-e1464023124869.jpeg";
import BookShelfImg from "../../assets/images/books-bookshelf-isolated-vector.png";
import NewArrivals from "../NewArrivals";

const LandingPage = () => {
  const CarouselData = [
    {
      name: "Hiring",
      image: HiringImg,
      link: "mailto:starshollowb@gmail.com",
    },
    {
      name: "Join our Book Club",
      image: JoinBookClubImg,
      link: "https://discord.com/invite/starshollow",
    },
    {
      name: "Visit our store",
      image: VisitUsImg,
      link: "https://www.google.com/maps/",
    },
  ];

  return (
    <Layout>
      <div className="landing-page">
        <div id="hero-section" className="hero-section items-center">
          <div className="content-container flex gap-8 lg:flex-row flex-column items-center mt-0">
            <div className="text-container mt-2">
              <h3 className="londrina text-center lg:text-left font-sans text-4xl mb-4 leading-tight">
                Welcome to Stars Hollow
              </h3>
              <h1 className="text-center lg:text-left font-sans font-bold text-2xl leading-tight mb-6">
                Your Beloved Bookstore, <br />
                Now in the Palm of Your Hand!
              </h1>
              <p className="text-xl text-center md:text-left mb-8">
                Explore our range of books and <br />
                start your adventure today.
              </p>
            </div>

            <div className="carousel-container ml-auto mt-0">
              <Carousel data={CarouselData} />
            </div>
          </div>
        </div>

        <div className="downloads-container">
          <div className="stats-details">
            <div className="icon-text">
              <div className="icon">
                <img src={BookImg} alt="Genre" width="100px" height="100px" />
              </div>
              <div className="text mx-2">
                <p className="font-bold text-white text-3xl">20 +</p>
                <p className="text-xl text-white">Genres</p>
              </div>
            </div>
            <div className="icon-text">
              <div className="icon">
                <img src={GenreImg} alt="Books" width="100px" height="100px" />
              </div>
              <div className="text mx-2">
                <p className="font-bold text-white text-3xl">300 +</p>
                <p className="text-xl text-white">Books</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 genres w-[60vw] mx-auto py-5 border-y border-pink-800">
          <h4 className="londrina-color text-5xl"> Genres</h4>
          <h6 className="bona text-xl mb-8">
            Browse Our Extensive Collection of Books Across Different Genres
          </h6>
          <Genre />
        </div>
      </div>

      <div className="mb-5 genres w-[60vw] mx-auto flex flex-col justify-center items-center">
        <img src={BookShelfImg} />
        <button className="text-white bg-pink-800 text-xl p-5 rounded-lg font-semibold">
          <Link to={"/AllBooks"}>Browse Our Selection of Books</Link>
        </button>
      </div>

      <div className="mb-5 genres w-[60vw] mx-auto flex flex-col justify-center items-center">
        <NewArrivals />
      </div>
    </Layout>
  );
};

export default LandingPage;
