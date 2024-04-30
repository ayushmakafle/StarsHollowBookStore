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
import { Link, useNavigate } from "react-router-dom";

import SearchInput from "../Form/SearchInput";
import "../../assets/stylings/Navbar.css";

import LogoImg from "../../assets/images/logo.png";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  console.log("auth", auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      <nav className="desktop-nav h-32">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="hover:border-b border-pink-800 px-3 py-2">
                <Link to="/">
                  <img className="h-24 w-24 my-10" src={LogoImg} alt="Logo" />
                </Link>
              </div>

              <div className="nav-links relative ml-4">
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
                to="/about-us"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="/wishlist"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faHeart} title="Wishlist" />
              </Link>
              <Link
                to="/cart"
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faCartShopping} title="Cart" />
              </Link>

              {!auth.user ? (
                <Link
                  to="/login"
                  className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faUser} title="User Dashboard" />
                </Link>
              ) : (
                <Link className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium">
                  <button
                    onClick={toggleUserDropdown}
                    className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2  md:text-lg text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faUser} title="User Dashboard" />
                    &nbsp;
                    {isUserDropdownOpen && <FontAwesomeIcon icon={faAngleUp} />}
                    {!isUserDropdownOpen && (
                      <FontAwesomeIcon icon={faAngleDown} />
                    )}
                  </button>
                  {isUserDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-32 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2  md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2  md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </Link>
              )}
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
                  to="/about-us"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  About Us
                </Link>
                <Link
                  to="/wishlist"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faHeart} /> Wishlist
                </Link>
                <Link
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faUser} /> Dashboard
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
