// import React, { useState, useEffect } from "react";
// //import MainNavbar from '../components/Navbar'
// import AdminMenu from "./AdminMenu";
// import axios from "axios";
// import { Table } from "antd";

// const StarsHollowUsers = () => {
//   const [users, setUsers] = useState([]);
//   const columns = [
//     {
//       title: "Username",
//       dataIndex: "username",
//       key: "username",
//     },
//     {
//       title: "Name",
//       dataIndex: "FirstName",
//       key: "FirstName",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "phoneNumber",
//       key: "phoneNumber",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//   ];
//   //get all users
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/api/v1/auth/get-user");
//       console.log("Response:", response);

//       if (response.data.success) {
//         setUsers(response.data.user);
//       } else {
//         console.error("Error fetching users:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []); // Run this effect only once on component mount

//   return (
//     <>
//       {/* <MainNavbar /> */}

//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1
//               style={{
//                 fontFamily: "poppins",
//                 color: "#ef5e99",
//                 margin: "20px",
//               }}
//             >
//               All Stars Hollow Users
//             </h1>
//             <Table
//               dataSource={users}
//               columns={columns}
//               style={{ margin: "20px" }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StarsHollowUsers;

import React from "react";

const StarsHollowUsers = () => {
  return <div>users</div>;
};

export default StarsHollowUsers;