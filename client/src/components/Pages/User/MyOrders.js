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
      <div className="container mx-auto  mt-10">
        <div className="flex md:flex-row flex-col gap-20">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>
          <div className="md:w-3/5 w-full">
            <h4 className="londrina-color mb-4 text-3xl">My orders</h4>

            {orders?.map((o, i) => {
              return (
                <div
                  className="border shadow rounded-lg mb-6 max-w-screen-sm "
                  key={i}
                >
                  <table className="w-full ">
                    <thead>
                      <tr className="bg-pink-900 text-white">
                        <th className="hidden sm:block sm:p-2 p-1">SNo.</th>
                        <th className="sm:p-2 p-1">Status</th>
                        <th className="sm:p-2 p-1">Date</th>
                        <th className="sm:p-2 p-1">Payment</th>
                        <th className="sm:p-2 p-1">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="hidden sm:block sm:p-2 p-1">{i + 1}</td>
                        <td className="sm:p-2 p-1">{o?.status}</td>
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
