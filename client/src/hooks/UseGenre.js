import { useState, useEffect } from "react";
import axios from "axios";

export default function useGenre() {
  const [genres, setGenres] = useState([]);

  //get cat
  const getGenres = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      setGenres(data?.genre);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return genres;
}
