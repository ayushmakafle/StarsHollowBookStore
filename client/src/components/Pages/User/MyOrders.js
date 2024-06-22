import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
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
    <Layout>
      <div className="container mx-auto mt-10">
        <div className="flex md:flex-row flex-col gap-20">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>
          <div className="md:w-3/5 w-full">
            <h4 className="londrina-color mb-4 text-3xl">My orders</h4>

            {orders?.map((order, index) => (
              <div
                className="border shadow rounded-lg mb-6 max-w-screen-sm"
                key={order._id}
              >
                <table className="w-full">
                  <thead>
                    <tr className="bg-pink-900 text-white">
                      <th className="hidden sm:block sm:p-2 p-1">SNo.</th>
                      <th className="sm:p-2 p-1">Order ID</th>
                      <th className="sm:p-2 p-1">Status</th>
                      <th className="sm:p-2 p-1">Date</th>
                      <th className="sm:p-2 p-1">Payment</th>
                      <th className="sm:p-2 p-1">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="hidden sm:block sm:p-2 p-1">
                        {index + 1}
                      </td>
                      <td
                        className="sm:p-2 p-1 cursor-pointer text-pink-800 underline"
                        onClick={() => copyToClipboard(order._id)}
                      >
                        {order._id}
                      </td>
                      <td className="sm:p-2 p-1">{order.status}</td>
                      <td className="sm:p-2 p-1">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="sm:p-2 p-1">
                        {order.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="sm:p-2 p-1">
                        {order.products.reduce(
                          (acc, product) => acc + product.quantity,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-4">
                  {order.products.map((product, idx) => (
                    <div
                      className="flex mb-4 border p-4 shadow-sm rounded-lg"
                      key={product._id}
                    >
                      <div className="w-[100px]">
                        {product.book ? (
                          <img
                            src={`/api/v1/book/book-photo/${product.book._id}`}
                            alt={product.book.name}
                            className="w-full h-auto rounded"
                          />
                        ) : (
                          <div className="w-full h-24 bg-gray-200 rounded" />
                        )}
                      </div>
                      <div className="w-2/3 pl-4">
                        {product.book ? (
                          <>
                            <p className="font-bold">{product.book.name}</p>
                            <p>Price: ${product.book.price}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold">Loading...</p>
                            <p>Loading...</p>
                          </>
                        )}
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
