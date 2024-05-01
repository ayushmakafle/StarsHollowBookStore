import React from "react";
// import MainNavbar from '../components/Navbar'
import { useSearch } from "../../context/search.js";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout.js";
import BookCard from "../BookCard.js";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1 className="font-poppins text-pink-600 text-3xl">
            Search Results
          </h1>
          <h6 className="text-de5d83 font-sans">
            {values?.results.length < 1
              ? "No books found"
              : `Found:${values.results.length}`}
          </h6>
          <div className="flex flex-wrap mt-4">
            {values?.results.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
