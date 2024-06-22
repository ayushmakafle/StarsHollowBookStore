import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import LoadingSvg from "../assets/loadinganimation.svg";

const NewArrivals = () => {
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchNewBooks();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {loading ? (
        <img src={LoadingSvg} alt="Loading..." className="w-20 h-20" />
      ) : (
        newBooks.map((book) => <BookCard key={book._id} book={book} />)
      )}
    </div>
  );
};

export default NewArrivals;
