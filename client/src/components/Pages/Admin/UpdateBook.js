import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.js";
import Layout from "../../Layout/Layout";

const UpdateBook = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Get single book
  const getSingleBook = async () => {
    try {
      const { data } = await axios.get(`/api/v1/book/get-book/${params.slug}`);
      setName(data.book.name);
      setId(data.book._id);
      setDescription(data.book.description);
      setPrice(data.book.price);
      setPrice(data.book.price);
      setQuantity(data.book.quantity);
      setGenre(data.book.genre._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBook();
  }, []);

  // Get all genres
  const getAllGenres = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      if (data.success) {
        setGenres(data.genre);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  // Update book function
  // Update book function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const bookData = new FormData();
      bookData.append("name", name);
      bookData.append("description", description);
      bookData.append("price", price);
      bookData.append("quantity", quantity);
      photo && bookData.append("photo", photo);
      bookData.append("genre", genre);
      const { data } = await axios.put(
        `/api/v1/book/update-book/${id}`,
        bookData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/books");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>
          <div className="md:ml-10 col-span-12 md:col-span-9">
            <h1 className="text-center text-pink-800 text-3xl my-5 font-bold">
              Update Book
            </h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <select
                  className="form-select mb-3 w-full rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2"
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                >
                  <option value="">Select a genre</option>
                  {genres.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  className="btn btn-primary p-2 w-full rounded-md"
                  style={{
                    backgroundColor: "#9D174D",
                    color: "white",
                  }}
                >
                  {photo ? photo.name : "Update Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="book_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/book/book-photo/${id}`}
                      alt="book_photo"
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
                  placeholder="Write a name"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter amount in stock"
                  className="form-control rounded border border-gray-300 hover:border-pink-800 focus:border-pink-800 focus:outline-none p-2 w-full"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="d-flex mb-3">
                <div style={{ margin: "5px" }}>
                  <button
                    className="btn btn-primary p-2 w-full rounded-md"
                    onClick={handleUpdate}
                    style={{ backgroundColor: "#9D174D", color: "white" }}
                  >
                    UPDATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBook;
