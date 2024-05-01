import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import AuthorForm from "../../Form/AuthorForm.js";
import Layout from "../../Layout/Layout.js";

const CreateAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/author/create-author", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllAuthor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating new author");
    }
  };

  const getAllAuthor = async () => {
    try {
      const { data } = await axios.get("/api/v1/author/get-author");
      if (data.success) {
        setAuthors(data?.author);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting authors");
    }
  };

  useEffect(() => {
    getAllAuthor();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/author/update-author/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllAuthor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating author");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/author/delete-author/${pId}`
      );
      if (data.success) {
        toast.success(`Author is deleted`);
        getAllAuthor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting author");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>
          <div className="md:ml-10 mt-10 col-span-12 md:col-span-9">
            <h1 className="text-pink-800 text-3xl mb-5">Manage Authors</h1>
            <div className="p-3">
              <AuthorForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-full">
              <table className="w-full rounded-lg">
                <thead>
                  <tr className="bg-pink-800 text-white rounded-lg">
                    <th className="p-2 text-center rounded-tl-lg">S.No.</th>
                    <th className="p-2 text-center ">Name</th>
                    <th className="p-2 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author, index) => (
                    <tr key={author._id} className="border border-gray-300 ">
                      <td className="p-2 text-center flex items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="p-2 text-center">{author.name}</td>
                      <td className="p-2 flex items-center justify-center md:gap-6">
                        <button
                          className="bg-pink-800 hover:bg-pink-900 text-white font-semibold py-1 px-3 rounded mr-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(author.name);
                            setSelected(author);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-pink-800 hover:bg-pink-900 text-white font-semibold py-1 px-3 rounded"
                          onClick={() => handleDelete(author._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visible && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 rounded-md z-50">
                  <AuthorForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                  />
                  <button
                    className="absolute top-0 right-0 m-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAuthor;
