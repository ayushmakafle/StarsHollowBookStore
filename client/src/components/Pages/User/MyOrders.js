import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../../context/auth";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>
          <div className="md:ml-10 mt-10 col-span-12 md:col-span-9">
            <h1 className="londrina-color text-pink-800 text-3xl mb-5">
              My Orders
            </h1>

            {orders?.map((o, i) => {
              return (
                <div className="border shadow rounded-lg mb-6 w-2/3 " key={i}>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-pink-900 text-white">
                        <th className="p-2">SNo.</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Payment</th>
                        <th className="p-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{o?.status}</td>
                        <td className="p-2">{formatDate(o?.createdAt)}</td>
                        <td className="p-2">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="p-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-4">
                    {o?.products?.map((p) => (
                      <div
                        className="flex mb-4 border p-4 shadow-sm rounded-lg"
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
    </Layout>
  );
};

export default MyOrders;
