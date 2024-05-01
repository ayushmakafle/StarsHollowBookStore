import React from "react";
// import MainNavbar from '../components/Navbar'
import { useSearch } from "../../context/search.js";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout.js";

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
            {values?.results.map((p) => (
              <div className="card m-2 w-72 h-96 p-4">
                <img
                  src={`/api/v1/book/book-photo/${p._id}`}
                  className="card-img-top w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-pink-600">
                    {p.name.substring(0, 40)}
                  </h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="font-bold text-pink-600">NRs.{p.price}/-</p>

                  <button
                    className="btn btn-primary ms-1 bg-pink-600"
                    onClick={() => navigate(`/book/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
