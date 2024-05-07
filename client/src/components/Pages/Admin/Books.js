import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { imageFromBuffer } from "../../../utils/utils";
import Layout from "../../Layout/Layout";
import LoadingSvg from "../../../assets/loadinganimation.svg";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get books for the specified page
  const getBooksForPage = async (pageNumber) => {
    try {
      const { data } = await axios.get(`/api/v1/book/book-list/${page}`);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooksForPage(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
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
              All Books List
            </h1>
            {loading ? (
              <div className="flex justify-center items-center">
                <img src={LoadingSvg} alt="Loading" className="w-16 h-16" />
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {books?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/book/${p.slug}`}
                    className="book-link"
                  >
                    <div className="max-w-xs mx-2 mb-4 rounded overflow-hidden shadow-lg">
                      <img
                        src={`/api/v1/book/book-photo/${p._id}`}
                        className="w-full h-40 object-cover"
                        alt={p.name}
                      />
                      <div className="px-6 py-4">
                        <h5 className="text-pink-800 font-bold text-xl mb-2">
                          {p.name}
                        </h5>
                        <p
                          className="text-gray-700 text-base overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            maxHeight: "3em",
                          }}
                        >
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="flex justify-center mt-5">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="bg-pink-800 text-white py-2 px-4 rounded-md mr-2"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="bg-pink-800 text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Books;
