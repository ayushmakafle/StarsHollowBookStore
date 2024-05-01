import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";

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
      <h3 className="text-center text-pink-500 font-semibold my-5">
        Genre - {genre?.name}
      </h3>
      <h6 className="text-center text-gray-600 font-medium">
        {books?.length} books found
      </h6>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {books?.map((p) => (
            <div
              className="card flex flex-col bg-white rounded-lg shadow-md"
              style={{ width: "450px", height: "450px" }}
            >
              <img
                src={`/api/v1/book/book-photo/${p._id}`}
                className="card-img-top object-cover"
                alt={p.name}
                style={{ height: "200px" }}
              />
              <div className="card-body flex flex-col p-4">
                <h5 className="card-title text-pink-500 font-semibold">
                  {p.name.substring(0, 40)}
                </h5>
                <p className="card-text text-gray-600">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text text-gray-600">NRs.{p.price}/-</p>
                <button
                  className="btn btn-primary mt-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md"
                  onClick={() => navigate(`/book/${p.slug}`)}
                >
                  More Details
                </button>
              </div>
            </div>
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
    </Layout>
  );
};

export default GenreBook;
