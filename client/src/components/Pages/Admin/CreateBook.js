// import React, { useState, useEffect } from "react";
// //import MainNavbar from '../components/Navbar'
// import { useNavigate } from "react-router-dom";
// import AdminMenu from "./AdminMenu";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Select } from "antd";
// const { Option } = Select;

// const CreateBook = () => {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [photo, setPhoto] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");

//   //get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong while getting categories");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //create book
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const bookData = new FormData();
//       bookData.append("name", name);
//       bookData.append("description", description);
//       bookData.append("price", price);
//       bookData.append("quantity", quantity);
//       bookData.append("photo", photo);
//       bookData.append("category", category);
//       const { data } = await axios.post("/api/v1/book/create-book", bookData);
//       if (data.success) {
//         toast.success("Book created successfully");
//         navigate("/dashboard/admin/books");
//       } else {
//         toast.error(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong while creating book");
//     }
//   };

//   return (
//     <>
//       {/* <MainNavbar /> */}
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 style={{ color: "#ef5e99", margin: "20px" }}>Create Books</h1>
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="select a category"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }} //value not from react from css
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>
//               <div className="mb-3">
//                 <label className="btn btn-outline-primary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>
//               {/* preview image using browser properties*/}
//               <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="book photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="Enter Book Name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={description}
//                   placeholder="Enter Book Description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="Enter Book Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="Enter Quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping"
//                   className="form-select mb-3"
//                   onChange={(value) => setShipping(value)}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>
//               <div className="mb-3 text-center">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleCreate}
//                   style={{ backgroundColor: "#ef5e99" }}
//                 >
//                   Create Book
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateBook;

import React from "react";

const CreateBook = () => {
  return <div>create book</div>;
};

export default CreateBook;
