import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import "../assets/stylings/BookCard.css";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import { useWishlist } from "../context/wishlist";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [wishlist, setWishlist] = useWishlist();

  const handleClick = () => {
    navigate(`/book/${book.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item._id === book._id);
    if (existingProduct) {
      existingProduct.numberOfItems += 1;
    } else {
      updatedCart.push({
        _id: book._id,
        name: book.name,
        slug: book.slug,
        author: book.author.name,
        price: book.price,
        numberOfItems: 1,
      });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Book added to cart");
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    const updatedWishlist = [...wishlist];
    const existingProduct = updatedWishlist.find(
      (item) => item._id === book._id
    );
    if (existingProduct) {
      existingProduct.numberOfItems += 1;
    } else {
      updatedWishlist.push({
        _id: book._id,
        name: book.name,
        author: book.author.name,
        price: book.price,
        numberOfItems: 1,
      });
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Book added to wishlist");
  };

  return (
    <div
      className="card m-2 border border-gray-300 rounded-lg hover:shadow-2xl"
      onClick={handleClick}
      style={{ width: "18rem" }}
    >
      <div className="overflow-hidden rounded-t-lg h-64">
        <img
          src={`/api/v1/book/book-photo/${book._id}`}
          className="card-img-top object-cover w-full h-full"
          alt={book.name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-2xl font-bold text-pink-800 mb-2 p-4 h-20">
          {book.name}
        </h5>
        <p className="card-text mb-2 text-lg text-pink-900 px-4">
          {book.author.name}
        </p>
        <p className="price mb-2 font-bold text-xl px-4">$ {book.price}</p>
        <div className="buttons flex justify-end gap-4 px-4 text-lg mb-4">
          {book.quantity > 0 ? (
            <>
              <button
                className="bg-pink-800 text-white px-2 py-1 mb-2 rounded-xl"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
              <button
                className="bg-pink-800 text-white px-2 py-1 mb-2 rounded-xl"
                onClick={handleAddToWishlist}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </>
          ) : (
            <p className="text-red-500 font-bold">Out of stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
