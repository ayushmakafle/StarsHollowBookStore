import React from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const LandingPage = () => {
  const [auth, setAuth] = useAuth();
  const notify = () => toast.success("Wow so easy!");
  return (
    <Layout>
      home
      <button onClick={notify}>Notify!</button>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default LandingPage;
