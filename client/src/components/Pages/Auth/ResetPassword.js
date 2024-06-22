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

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (!newPassword.match(passwordRegex)) {
      return toast.error(
        "Password must be at least 8 characters, including one special character."
      );
    }
    try {
      const res = await axios.post("/api/v1/auth/reset-password", {
        email,
        token,
        newPassword,
      });
      toast.success(
        "Password reset successful. You can now log in with your new password."
      );
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen space-x-8">
        <div className="w-1/5 md:block hidden mr-20">
          <div className="flex flex-col items-center justify-center">
            <img src={LogoImg} alt="Logo" className="w-full" />
            <h2 className="signup text-2xl font-bold mt-10">Reset Password</h2>
          </div>
        </div>
        <div className="md:w-2/5 my-10 w-2/3">
          <div className="register-form p-8 rounded-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="md:hidden text-2xl font-bold mb-4">
                Reset Password
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
              <div className="mb-4">
                <input
                  type="text"
                  name="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2"
                  placeholder="Enter your token"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  placeholder="Enter your password"
                  type={visible ? "text" : "password"}
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  Reset Password
                </button>
                <div className="mt-2 flex items-center justify-end">
                  <div>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
