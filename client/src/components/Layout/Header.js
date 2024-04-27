import React, { useState } from "react";
import SearchInput from "../Form/SearchInput";
import "../../assets/stylings/Navbar.css";

import LogoImg from "../../assets/images/logo.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="block h-8 w-auto" src={LogoImg} alt="Logo" />
          </div>
          {/* Links */}
          <div className="flex">
            {/* Deals */}
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Deals
            </a>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Genres
                {/* Downward facing arrow */}
                <svg
                  className="-mr-1 ml-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Dropdown content */}
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Adventure
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Comedy
                    </a>
                    {/* Add more genres here */}
                  </div>
                </div>
              )}
            </div>
            {/* Search */}
            <li>
              <SearchInput />
            </li>
            {/* About Us */}
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </a>
            {/* Wishlist */}
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Wishlist
            </a>
            {/* Cart */}
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cart
            </a>
            {/* User Profile */}
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              User Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
