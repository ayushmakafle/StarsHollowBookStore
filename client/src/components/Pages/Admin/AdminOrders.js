import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import Layout from "../../../components/Layout/Layout";
import { useAuth } from "../../../context/auth";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const { Option } = Select;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.info("Order Id copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container mx-auto p-3">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="londrina-color text-center text-2xl font-bold mb-6">
              All Orders
            </h1>
            <div className="overflow-x-auto">
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow mb-6" key={i}>
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-pink-900 text-white">
                          <th className="sm:p-2 p-1">Order ID</th>
                          <th className="sm:p-2 p-1">Status</th>
                          <th className="sm:p-2 py-1">Buyer</th>
                          <th className="sm:p-2 p-1">Date</th>
                          <th className="sm:p-2 p-1">Payment</th>
                          <th className="sm:p-2 p-1">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td
                            className="sm:p-2 p-1 cursor-pointer text-pink-800 underline"
                            onClick={() => copyToClipboard(o?._id)}
                          >
                            {o?._id}
                          </td>
                          <td className="sm:p-2 p-1">
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                              className="w-full"
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td className="sm:p-2 p-1">{o?.buyer?.username}</td>
                          <td className="sm:p-2 p-1">
                            {formatDate(o?.createdAt)}
                          </td>
                          <td className="sm:p-2 p-1">
                            {o?.payment.success ? "Success" : "Failed"}
                          </td>
                          <td className="sm:p-2 p-1">{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-4">
                      {o?.products?.map((p) => (
                        <div
                          className="flex mb-4 border p-4 shadow-sm"
                          key={p._id}
                        >
                          <div className="w-[100px]">
                            <img
                              src={`/api/v1/book/book-photo/${p._id}`}
                              alt={p.name}
                              className="w-full h-auto rounded"
                            />
                          </div>
                          <div className="w-2/3 pl-4">
                            <p className="font-bold">{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price: ${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
