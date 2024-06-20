import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Table } from "antd";
import Layout from "../../Layout/Layout";

const StarsHollowUsers = () => {
  const [users, setUsers] = useState([]);
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/get-user");
      if (response.data.success) {
        setUsers(response.data.user);
      } else {
        console.error("Error fetching users:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto my-3 px-3">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="londrina-color text-center text-2xl font-bold mb-6">
              All Stars Hollow Users
            </h1>
            <div className="overflow-x-auto mx-10">
              <Table dataSource={users} columns={columns} pagination={false} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StarsHollowUsers;
