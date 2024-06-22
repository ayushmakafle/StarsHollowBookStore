import React, { useState } from "react";
import LogoImg from "../../../assets/images/logo.png";
import "../../../assets/stylings/Auth.css";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const Forget = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forget`, { email });
      if (res.status === 201) {
        toast.success("Reset email sent. Check your email inbox.");
        navigate("/forget-password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen space-x-8">
        <div className="w-1/5 md:block hidden mr-20">
          <div className="flex flex-col items-center justify-center">
            <img src={LogoImg} alt="Logo" className="w-full" />
            <h2 className="signup text-2xl font-bold mt-10">
              Forgot Password?
            </h2>
          </div>
        </div>
        <div className="md:w-2/5 my-10 w-2/3">
          <div className="register-form p-8 rounded-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="md:hidden text-2xl font-bold mb-4">
                Forgot Password?
              </h2>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className=" text-white px-4 py-2 rounded-md hover:bg-pink-800 w-full"
                >
                  Send Reset Email
                </button>
              </div>
            </form>
            <div className="mt-2 flex items-center justify-end">
              <Link to="/login" className=" inline-block">
                <button className="py-2 px-4 text-white rounded-md hover:bg-pink-800">
                  Login?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forget;
