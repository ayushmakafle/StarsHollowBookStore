import React from "react";
// import MainNavbar from '../components/Navbar'
import { useSearch } from "../../context/search.js";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout.js";
import BookCard from "../BookCard.js";
import Genre from "../Genre.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <button className="back-button" onClick={goBack}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ color: "#800000", height: "40px", margin: "4px" }}
        />
      </button>
      <div className="w-[60vw] mx-auto">
        <div className="my-10 genres py-5 border-y border-pink-800">
          <h4 className="londrina-color text-5xl"> Genres</h4>
          <h6 className="bona text-xl mb-8">
            Browse Our Extensive Collection of Books Across Different Genres
          </h6>
          <Genre />
        </div>
        <h3 className="text-center londrina-color text-3xl font-semibold my-5">
          Search Results
        </h3>
        <h6 className="text-center text-pink-800 font-bold text-lg">
          {values?.results.length < 1
            ? "No books found"
            : `Found: ${values.results.length}`}
        </h6>

        <div className="flex flex-wrap gap-10 w-[70vw] mx-auto justify-center mt-4">
          {values?.results.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
