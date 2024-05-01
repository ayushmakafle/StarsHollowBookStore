import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const NewArrivals = () => {
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const response = await axios.get("/api/v1/book/latest");
        if (response.data.success) {
          setNewBooks(response.data.books);
        } else {
          console.error("Error fetching new books:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching new books:", error.message);
      }
    };

    fetchNewBooks();
  }, []);

  return (
    <div>
      <div>
        {newBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
