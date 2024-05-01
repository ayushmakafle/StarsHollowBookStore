import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices.js";
import Genre from "../Genre.js";
import { useNavigate } from "react-router-dom";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate = useNavigate();

  //get all cat
  const getAllGenre = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      if (data?.success) {
        setGenres(data?.genre);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGenre();
    getTotal();
  }, []);
  //get books
  const getAllBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/book/book-list/${page}`);
      setLoading(false);
      setBooks(data.books);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/book/book-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/book/book-list/${page}`);
      setLoading(false);
      setBooks([...books, ...data?.books]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllBooks();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterBook();
  }, [checked, radio]);

  //get filterd book
  const filterBook = async () => {
    try {
      const { data } = await axios.post("/api/v1/book/book-filters", {
        checked,
        radio,
      });
      setBooks(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Books - Best offers "}>
      <div className="container mx-auto flex flex-row mt-3">
        <div className="w-1/4">
          <h4 className="text-center">Filter By Genre</h4>
          <div className="items-center">
            {genres?.map((c) => (
              <div key={c._id} className="flex flex-col items-center mr-4">
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-red-500 text-white py-2 px-4 mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="w-3/4">
          <Genre genres={genres} setSelectedGenres={setSelectedGenres} />
          <h1 className="text-center">All Books</h1>
          <div className="flex flex-wrap">
            {books?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/book/book-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 ml-1"
                    onClick={() => navigate(`/book/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="bg-gray-500 text-white px-2 py-1 ml-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {books && books.length < total && (
              <button
                className="bg-yellow-500 text-white py-2 px-4"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllBooksPage;
