import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import BookCard from "../BookCard";
import Genre from "../Genre";

const GenreBook = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (params?.slug) getBooksByCat();
  }, [params?.slug]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

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

  const getBooksByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/book/book-genre/${params.slug}`
      );
      setBooks(data?.books);
      setGenre(data?.genre);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-[60vw] mx-auto">
        <div className="my-10 genres py-5 border-y border-pink-800">
          <h4 className="londrina-color text-5xl"> Genres</h4>
          <h6 className="bona text-xl mb-8">
            Browse Our Extensive Collection of Books Across Different Genres
          </h6>
          <Genre />
        </div>
        <h3 className="text-center londrina-color text-3xl font-semibold my-5">
          Genre : {genre?.name}
        </h3>
        <h6 className="text-center text-pink-800 font-bold text-lg">
          {books.length === 0 || books.length === 1
            ? `${books.length} book found`
            : `${books.length} books found`}
        </h6>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {books?.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          {books && books.length < total && (
            <button
              className="btn btn-primary bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => setPage(page + 1)}
            >
              {loading ? "Loading ..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GenreBook;
