import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.js";
import Layout from "../../Layout/Layout";
import "../../../assets/stylings/AdminDash.css";

import CloseIconImg from "../../../assets/images/crossIcon.png";

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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for delete modal visibility

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
      toast.error("Something went wrong in getting genre");
    }
  };

  useEffect(() => {
    getAllGenres();
  }, []);

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
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    setIsDeleteModalVisible(false);
    try {
      // Delete book from the database
      const { data } = await axios.delete(`/api/v1/book/delete-book/${id}`);

      if (data?.success) {
        // If deletion from the database is successful, update the book list
        const updatedBookList = genres.filter((book) => book._id !== id);
        setGenres(updatedBookList);

        toast.success("Book Deleted Successfully");
        navigate("/dashboard/admin/books");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };
  const handleCloseModal = () => {
    setIsDeleteModalVisible(false);
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
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/book/book-photo/${id}`}
                      alt="book_photo"
                      className="max-w-xs"
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
                    UPDATE BOOK
                  </button>
                </div>
                <div style={{ margin: "5px" }}>
                  <button
                    className="btn btn-primary p-2 w-full rounded-md"
                    onClick={showDeleteModal}
                    style={{ backgroundColor: "#9D174D", color: "white" }}
                  >
                    DELETE BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalVisible && (
        <div className="modal-wrapper">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              <img src={CloseIconImg} className="w-8 h-8" />
            </button>
            <div className="modal-content">
              <h2 className="font-bold text-3xl my-2">Confirm Deletion</h2>
              <p className="text-lg my-3">
                Are you sure you want to delete this book?
              </p>
              <div className="modal-buttons flex gap-4">
                <button
                  onClick={handleDelete}
                  className="btn btn-primary p-2 w-full rounded-md"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="btn btn-primary p-2 w-full rounded-md"
                  style={{ backgroundColor: "#9D174D", color: "white" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UpdateBook;
