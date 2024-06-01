import React from "react";
import Layout from "../Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Feature from "../FeatureSection";

import StarsHollowImg from "../../assets/images/bookstore.png";
import JoinBookClubImg from "../../assets/images/bookclub.png";

const AboutUs = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout className="container mx-auto">
      <button className="back-button" onClick={goBack}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ color: "#800000", height: "40px", margin: "4px" }}
        />
      </button>
      <div className="container mx-auto">
        <h1 className="londrina-color text-4xl font-bold text-center mb-6">
          About Us
        </h1>
        <div className="mb-4 border-b border-pink-800 pb-10">
          <div className="flex md:flex-row flex-col md:justify-center gap-10  items-center">
            <div>
              <h2 className="bona text-2xl font-bold text-pink-800 mb-4">
                Our Story
              </h2>
              <p className="text-lg leading-7 md:w-3/5 w-full">
                Nestled in the heart of the charming small town of Stars Hollow
                in New Milford, Connecticut, Stars Hollow Bookstore has been a
                beloved community hub for over 40 years. Since our doors first
                opened, we've been dedicated to fostering a love for reading and
                providing a warm, welcoming space for book lovers of all ages.
                Stars Hollow Bookstore was founded over four decades ago with a
                simple mission: to share the joy of reading with our community.
              </p>
            </div>

            <div className=" rounded-lg">
              <img src={StarsHollowImg} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
        <Feature />
        <div className="flex  md:flex-row flex-col gap-10 justify-between border-y border-pink-800 py-10">
          <div className="md:w-2/5 w-full">
            <h2 className="bona text-2xl font-bold text-pink-800 mb-4">
              A Beloved Community Hub
            </h2>
            <p className="text-lg leading-7">
              For generations, we've been more than just a bookstore. We've
              hosted countless book clubs, author readings, and community
              events, becoming a cornerstone of Stars Hollow's cultural and
              social life. Our friendly staff, always ready with a book
              recommendation or a warm cup of coffee, have helped create a place
              where everyone feels at home.
            </p>
          </div>
          <div className="md:w-2/5 w-full">
            <h2 className="bona text-2xl font-bold text-pink-800 mb-4">
              Going Online
            </h2>
            <p className="text-lg leading-7">
              In response to the evolving needs of our customers and the
              changing landscape of the book industry, Stars Hollow Bookstore
              has recently expanded online. Our new website allows us to reach
              readers far and wide, offering a curated selection of books,
              convenient shopping experiences, and a taste of our small-town
              charm.
            </p>
          </div>
        </div>
        <div className="mb-8 pt-10">
          <h2 className="bona text-2xl font-bold text-pink-800 mb-4 text-center">
            Join Our Community
          </h2>
          <div className="flex  md:flex-row flex-col gap-10 items-center justify-between">
            <div>
              <p className="text-lg leading-7 md:w-2/3 w-full">
                We invite you to explore our website, visit our bookstore, and
                become part of the Stars Hollow Bookstore family. Follow us on
                social media, sign up for our newsletter, and stay connected
                with all the latest news, events, and special offers.
              </p>
              <p className="text-lg leading-7 md:w-2/3 w-full">
                Thank you for being part of our story. Here's to many more years
                of shared adventures, discoveries, and beloved books.
              </p>
            </div>
            <div className="w-2/3">
              <a href="https://discord.com/invite/starshollow" target="_blank">
                <img src={JoinBookClubImg} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
