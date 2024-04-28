import React from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";

const LandingPage = () => {
  const notify = () => toast.success("Wow so easy!");
  return (
    <Layout>
      home
      <button onClick={notify}>Notify!</button>
    </Layout>
  );
};

export default LandingPage;
