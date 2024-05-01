import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={`/api/v1/book/book-photo/${book._id}`}
        className="card-img-top"
        alt={book.name}
      />
      <div className="card-body">
        <h5 className="card-title">{book.name}</h5>
        <p className="card-text">{book.description.substring(0, 30)}...</p>
        <p className="card-text"> $ {book.price}</p>
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-1"
          onClick={() => navigate(`/book/${book.slug}`)}
        >
          More Details
        </button>
        <button className="bg-gray-500 text-white px-2 py-1 ml-1">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default BookCard;
