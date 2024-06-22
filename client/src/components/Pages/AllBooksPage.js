import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices.js";
import Genre from "../Genre.js";
import { useNavigate } from "react-router-dom";
import BookCard from "../BookCard.js";

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
    <Layout>
      <div className="container mx-auto flex flex-row mt-3">
        <div className="w-[60vw] mx-auto">
          <div className="my-10 genres py-5 border-y border-pink-800">
            <h4 className="londrina-color text-5xl"> Genres</h4>
            <h6 className="bona text-xl mb-8">
              Browse Our Extensive Collection of Books Across Different Genres
            </h6>
            <Genre />
          </div>
          <h1 className="text-center londrina-color text-5xl py-5 ">
            All Books
          </h1>
          <div className="flex flex-wrap gap-10 w-[70vw] mx-auto justify-center mt-4">
            {books?.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {books && books.length < total && (
              <button
                className="bg-pink-900 text-white py-2 px-4 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllBooksPage;
