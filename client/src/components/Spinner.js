import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loadinganimation.svg";
import Layout from "./Layout/Layout";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 300);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Layout>
      <div
        className="flex justify-center items-center"
        style={{
          height: "100vh",
          color: "maroon",
          fontSize: "1.5rem",
        }}
      >
        <div className="text-center">
          <h1>Redirecting you in {count} seconds</h1>
          {/* <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}
          <Loading />
        </div>
      </div>
    </Layout>
  );
};

export default Spinner;
