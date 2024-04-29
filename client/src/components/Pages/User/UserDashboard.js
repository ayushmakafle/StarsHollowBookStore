import React from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "../../../context/auth";
import Layout from "../../Layout/Layout";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  return (
    <Layout>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
        onClick={goBack}
      >
        <span
          role="img"
          aria-label="Back Arrow"
          className="text-pink-500"
          style={{ color: "#f38dbc" }}
        >
          ❮❮
        </span>
      </button>
      <div className="container-fluid mt-3 mb-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>

          <div className="col-span-12 md:col-span-9">
            <div className="card p-3 flex items-center m-5">
              <div>
                <h1
                  className="mb-3 text-pink-500 font-normal text-center"
                  style={{
                    fontFamily: "sans-serif",
                  }}
                >
                  Hello {auth?.user?.username}!
                </h1>
                <h5
                  className="text-pink-600 font-medium text-center"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  We're glad to have you here at Stars Hollow. <br />
                  Explore the features and make the most of your dashboard
                  experience.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
