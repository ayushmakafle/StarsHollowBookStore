import React from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="md:text-9xl text-5xl text-pink-900 font-bold">404</h1>
        <h3 className="md:text-3xl text-lg text-pink-950 mt-2">
          Oops! Page Not Found{" "}
        </h3>
        <button
          onClick={goBack}
          style={{
            backgroundColor: "#ac3b61",
            padding: "10px 20px",
            borderRadius: "5px",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            margin: "20px",
          }}
        >
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default PageNotFound;
