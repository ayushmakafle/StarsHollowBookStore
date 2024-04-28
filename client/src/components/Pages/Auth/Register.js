import React, { useState } from "react";
import LogoImg from "../../../assets/images/logo.png";
import "../../../assets/stylings/Auth.css";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.username}
                  onChange={handleChange}
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
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    placeholder="Enter your Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
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
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
                <small>Format: 123-456-7890</small>
              </div>
              <div className="mb-4">
                <input
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="confirm password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
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
