import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <h4 className="font-semibold text-pink-800">User Panel</h4>
      <div className="space-y-1">
        <NavLink
          to="/dashboard/user/profile"
          className="block py-2 px-4 bg-pink-800 text-white hover:bg-pink-700 rounded-md transition duration-300"
        >
          My Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/order"
          className="block py-2 px-4 bg-pink-800 text-white hover:bg-pink-700 rounded-md transition duration-300"
        >
          My Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
