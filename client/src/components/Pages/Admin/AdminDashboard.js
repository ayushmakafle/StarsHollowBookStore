import React from "react";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../../context/auth";
import AdminMenu from "./AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto my-3 px-3">
        <div className="md:flex">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          <div className="md:w-3/4 m-4 mt-12">
            <div className="bg-white shadow-md p-4 rounded-md">
              <h1
                className="mb-3 text-pink-800 font-bold text-4xl text-center"
                style={{
                  fontFamily: "sans-serif",
                }}
              >
                Hello {auth?.user?.username}!
              </h1>{" "}
              <div className="text-2xl text-pink-900 text-center">
                You've arrived at the heart of Stars Hollow Bookstore's admin
                panel.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
