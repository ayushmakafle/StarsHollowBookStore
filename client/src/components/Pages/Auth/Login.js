import React, { useState } from "react";
import LogoImg from "../../../assets/images/logo.png";
import "../../../assets/stylings/Auth.css";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const UserLogin = () => {
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen space-x-8">
        <div className="w-1/5 md:block hidden mr-20">
          <div className="flex flex-col items-center justify-center">
            <img src={LogoImg} alt="Logo" className="w-full" />
            <h2 className="signup text-2xl font-bold mt-10">Login</h2>
          </div>
        </div>
        <div className="md:w-2/5 my-10 w-2/3">
          <div className="register-form p-8 rounded-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="md:hidden text-2xl font-bold mb-4">Login</h2>

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
              <div className="mb-4 relative">
                <input
                  placeholder="Enter your password"
                  type={visible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {visible ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="cursor-pointer"
                      size={20}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="cursor-pointer"
                      size={20}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className=" text-white px-4 py-2 rounded-md hover:bg-pink-800 w-full"
                >
                  Login
                </button>
                <div className="mt-2 flex items-center justify-end">
                  <h5 className="inline-block mr-2 px-4">
                    New at Stars Hollow?
                  </h5>
                  <Link to="/register" className=" inline-block">
                    <button
                      className="py-2 px-4 text-white rounded-md hover:bg-pink-900"
                      style={{ borderRadius: "8px" }}
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserLogin;
