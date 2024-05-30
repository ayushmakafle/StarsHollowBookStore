import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../../context/auth";

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
    <Layout title={"Your Orders"}>
      <div className="container mx-auto p-3 m-3 dashboard">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-center text-2xl font-bold mb-6">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-6" key={i}>
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2">#</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Buyer</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Payment</th>
                        <th className="p-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{o?.status}</td>
                        <td className="p-2">{o?.buyer?.username}</td>
                        <td className="p-2">
                          {new Date(o?.createAt).toLocaleString()}
                        </td>
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
                        className="flex mb-4 border p-4 shadow-sm"
                        key={p._id}
                      >
                        <div className="w-1/3">
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
    </Layout>
  );
};

export default MyOrders;
