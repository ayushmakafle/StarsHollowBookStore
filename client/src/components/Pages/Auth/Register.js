import React, { useState } from "react";
import LogoImg from "../../../assets/images/logo.png";
import "../../../assets/stylings/Auth.css";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
const UserRegistration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!password.match(passwordRegex)) {
      return toast.error(
        "Password must be at least 8 characters, including one special character."
      );
    }

    if (!email.match(emailRegex)) {
      return toast.error("Please enter a valid email address.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        address,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
            <h2 className="signup text-2xl font-bold mt-10">Sign Up!</h2>
          </div>
        </div>
        <div className="md:w-2/5 my-10 w-2/3">
          <div className="register-form p-8 rounded-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="md:hidden text-2xl font-bold mb-4">Sign Up!</h2>

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
                  placeholder="Enter your username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="name flex justify-between gap-2">
                <div className="mb-4">
                  <input
                    placeholder="Enter your First Name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    placeholder="Enter your Last Name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  placeholder="Enter your phone number"
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
                <small>Format: 123-456-7890</small>
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

              <div className="mb-4 relative">
                <input
                  placeholder="confirm password"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {confirmPasswordVisible ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="cursor-pointer"
                      size={20}
                      onClick={() => setConfirmPasswordVisible(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="cursor-pointer"
                      size={20}
                      onClick={() => setConfirmPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  placeholder="Enter your address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className=" text-white px-4 py-2 rounded-md hover:bg-pink-900 w-full"
                >
                  Sign Up
                </button>
                <div className="mt-2 flex items-center justify-end">
                  <h5 className="inline-block mr-2 px-4">Already a member?</h5>
                  <Link to="/login" className=" inline-block">
                    <button
                      className="py-2 px-4 text-white rounded-md hover:bg-pink-900"
                      style={{ borderRadius: "8px" }}
                    >
                      Login
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

export default UserRegistration;
