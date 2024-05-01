import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import MainNavbar from '../components/Navbar';
import { Link, useParams } from "react-router-dom";
//import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Rate } from "antd";
import Layout from "../Layout/Layout";

const BookDetails = () => {
  const params = useParams();
  //const [cart, setCart] = useCart();
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
        <span
          role="img"
          aria-label="Back Arrow"
          className="pink-arrow text-pink-600"
        >
          ❮❮
        </span>
      </button>
      <div className="container mt-4">
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
              <h2 className="card-title text-center mb-4 font-poppins text-pink-600">
                {book.name}
              </h2>
              {book.genre && (
                <p className="card-text text-ef5e99">
                  <span className="text-de5d83">Genre:</span> {book.genre.name}
                </p>
              )}
              <p className="card-text text-ef5e99 font-bold">
                <span className="text-de5d83">Price:</span> NRs. {book.price}/-
              </p>
              <p className="card-text text-ef5e99">
                Rating from EaseFlow Doctors:{" "}
                <Rate value={Number(book.averageRating)} disabled allowHalf />
              </p>
              <p className="card-text text-black">{book.description}</p>
              {/* <button
                className="btn btn-secondary bg-pink-600"
                onClick={() => {
                  const updatedCart = [...cart];
                  const existingBook = updatedCart.find(
                    (item) => item._id === book._id
                  );
                  if (existingBook) {
                    existingBook.numberOfItems += 1;
                  } else {
                    updatedCart.push({ ...book, numberOfItems: 1 });
                  }
                  setCart(updatedCart);
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  toast.success("Item Added to cart");
                }}
              >
                <i className="fas fa-cart-shopping"></i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h1 className="text-3xl font-serif text-center text-pink-600">
          Similar Books
        </h1>
        {relatedBooks.length < 1 && (
          <h3 className="text-xl font-serif text-center text-pink-600">
            No Similar Books Found
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {relatedBooks?.map((p) => (
            <div className="card" key={p._id}>
              <img
                src={`/api/v1/book/book-photo/${p._id}`}
                alt={p.name}
                className="card-img-top w-full h-48 object-cover"
              />
              <div className="card-body">
                <h5 className="card-title text-pink-600">
                  {p.name.substring(0, 40)}
                </h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">NRs.{p.price}/-</p>
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
    </Layout>
  );
};

export default BookDetails;
