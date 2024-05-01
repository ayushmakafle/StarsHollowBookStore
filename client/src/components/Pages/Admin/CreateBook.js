import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu.js";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../Layout/Layout.js";

const CreateBook = () => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState(""); // Change to authorId to avoid conflict
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // Fetch all genres
  const getAllGenres = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      if (data.success) {
        setGenres(data.genre);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching genres");
    }
  };

  // Fetch all authors
  const getAllAuthors = async () => {
    // Corrected function name
    try {
      const { data } = await axios.get("/api/v1/author/get-author");
      if (data.success) {
        setAuthors(data.author); // Set authors state correctly
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching authors");
    }
  };

  useEffect(() => {
    getAllGenres();
    getAllAuthors(); // Call getAllAuthors instead of getAllAuthor
  }, []);

  // Handle book creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const bookData = new FormData();
      bookData.append("name", name);
      bookData.append("description", description);
      bookData.append("price", price);
      bookData.append("quantity", quantity);
      bookData.append("photo", photo);
      bookData.append("genre", genre);
      bookData.append("author", authorId); // Corrected variable name
      const { data } = await axios.post("/api/v1/book/create-book", bookData);
      if (data.success) {
        toast.success("Book created successfully");
        navigate("/dashboard/admin/books");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating book");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>
          <div className="ml-10 mt-10 col-span-12 md:col-span-9">
            <h1 className="text-pink-800 text-3xl mb-5">Add Books</h1>
            <div className="w-full max-w-lg">
              <select
                className="form-select mb-3 w-full rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2"
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select mb-3 w-full rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2"
                onChange={(e) => setAuthorId(e.target.value)}
                value={authorId}
              >
                <option value="">Select the author</option>
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <label
                  className="btn btn-primary p-2 w-full rounded-md"
                  style={{ backgroundColor: "#9D174D", color: "white" }}
                >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="book photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Book Name"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Enter Book Description"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Book Price"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-primary p-2 w-full rounded-md"
                  onClick={handleCreate}
                  style={{ backgroundColor: "#9D174D", color: "white" }}
                >
                  Create Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBook;
