import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [username, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        username,
        email,
        password,
        phoneNumber,
        address,
        firstName,
        lastName,
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

  useEffect(() => {
    const { email, username, phoneNumber, address, firstName, lastName } =
      auth?.user;
    setFirstName(firstName);
    setLastName(lastName);
    setName(username);
    setPhone(phoneNumber);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-3 mt-10">
        <div className="flex md:flex-row flex-col gap-20 w-[70vw] mx-auto">
          <div className="col-span-12 md:col-span-3">
            <UserMenu />
          </div>
          <div className="md:w-2/5 w-full">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                <h4 className="londrina-color mb-4 text-3xl">USER PROFILE</h4>
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="username"
                    placeholder="Enter your name"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="username"
                    placeholder="Enter your first name"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="username"
                    placeholder="Enter your last name"
                    autoFocus
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    id="address"
                    placeholder="Enter your address"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-pink-800 hover:bg-pink-900 text-white font-semibold py-2 px-4 rounded-lg"
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
