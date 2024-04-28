import React from "react";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {auth?.user?.username}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phoneNumber}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
