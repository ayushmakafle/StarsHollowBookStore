import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuthor() {
  const [authors, setAuthors] = useState([]);

  //get authors
  const getAuthors = async () => {
    try {
      const { data } = await axios.get("/api/v1/author/get-author");
      setAuthors(data?.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return authors;
}
