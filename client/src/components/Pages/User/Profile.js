import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, username, phoneNumber, address } = auth?.user;
    setName(username);
    setPhone(phoneNumber);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                <h4 className="text-pink-500 font-semibold mb-4">
                  USER PROFILE
                </h4>
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="username"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="email"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="address"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
