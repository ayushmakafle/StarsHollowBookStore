import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import SearchInput from "../Form/SearchInput";
import "../../assets/stylings/Navbar.css";

import LogoImg from "../../assets/images/logo.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="desktop-nav">
        <div className="max-w-7xl mx-auto p-4 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="hover:border-b border-pink-800 px-3 py-2">
                <Link to="/">
                  <img className="block h-16 w-16" src={LogoImg} alt="Logo" />
                </Link>
              </div>

              <div className="nav-links relative">
                <button
                  onClick={toggleDropdown}
                  className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
                >
                  Genres &nbsp;
                  {isDropdownOpen && <FontAwesomeIcon icon={faAngleUp} />}
                  {!isDropdownOpen && <FontAwesomeIcon icon={faAngleDown} />}
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-32 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="#"
                        className="block px-4 py-2  md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Action
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2  md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Adventure
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2  md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Comedy
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="nav-links mr-2">
                <SearchInput />
              </div>
              <Link
                to="#"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faHeart} title="Wishlist" />
              </Link>
              <Link
                to="#"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faCartShopping} title="Cart" />
              </Link>
              <Link
                to="#"
                className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faUser} title="User Dashboard" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile-nav">
        <div className="max-w-7xl mx-auto p-4 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="hover:border-b border-pink-800 px-3 py-2">
                <Link to="/">
                  <img className="block h-16 w-16" src={LogoImg} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="nav-links mr-2">
                <SearchInput />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="absolute z-10 top-16 right-0 w-full bg-white shadow-md">
              <div className="p-4">
                <Link
                  to="#"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  About Us
                </Link>
                <Link
                  to="#"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faHeart} /> Wishlist
                </Link>
                <Link
                  to="#"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faUser} /> User Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
