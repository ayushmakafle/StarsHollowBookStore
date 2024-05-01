import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import BookCard from "../BookCard";

const BookDetails = () => {
  const params = useParams();
  const [book, setBook] = useState({});
  const [relatedBooks, setRelatedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getBook();
  }, [params?.slug]);

  const getBook = async () => {
    try {
      const { data } = await axios.get(`/api/v1/book/get-book/${params.slug}`);
      setBook(data?.book);
      getSimilarBook(data?.book._id, data?.book.genre._id);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const getSimilarBook = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/book/related-book/${pid}/${cid}`
      );
      setRelatedBooks(data?.books);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <Layout>
      <button className="back-button" onClick={goBack}>
        <span role="img" className="pink-arrow text-pink-800 m-6 ">
          ❮❮
        </span>
      </button>
      <div className="container my-10 w-[70vw] mx-auto border-b border-pink-900 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={`/api/v1/book/book-photo/${book._id}`}
              alt={book.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="bona md:text-5xl text-3xl card-title text-center mb-10  text-pink-600">
                {book.name}
              </h2>
              <div className="title-price flex justify-around border-b border-pink-900 pb-3">
                <div className="author-genre">
                  {book.author && (
                    <p className="md:text-2xl text-xl bona text-pink-900 mb-5 hover:text-pink-600">
                      <span className="londrina-color">Author:</span>{" "}
                      {book?.author?.name}
                    </p>
                  )}
                  {book.genre && (
                    <p className="md:text-2xl text-xl bona text-pink-900 hover:text-pink-600">
                      <span className="londrina-color">Genre:</span>{" "}
                      <Link to={`/genre/${book.genre.slug}`}>
                        {book.genre.name}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="price">
                  <p className="font-bold md:text-2xl text-xl text-blue-950 ">
                    <span className="londrina-color">Price:</span> ${" "}
                    {book.price}/-
                  </p>
                </div>
              </div>

              <p className="md:pl-10 card-text text-black pt-3 bona md:text-xl text-lg">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 my-10 w-[70vw] mx-auto">
        <h1 className="londrina-color text-3xl text-center">Similar Books</h1>
        {relatedBooks.length < 1 && (
          <h3 className="text-xl font-serif text-center text-pink-600">
            No Similar Books Found
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {relatedBooks?.map((p) => (
            <BookCard key={p._id} book={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
