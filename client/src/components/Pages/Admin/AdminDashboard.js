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
          <div className="md:w-3/4">
            <div className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-4">Admin Details</h3>
              <div className="mb-4">
                <h4 className="text-lg font-medium">Admin Name:</h4>
                <p>{auth?.user?.username}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium">Admin Email:</h4>
                <p>{auth?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
