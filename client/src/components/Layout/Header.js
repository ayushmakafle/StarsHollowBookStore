import React, { useState, useEffect, useRef } from "react";
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
import { Badge, Avatar } from "antd";

import SearchInput from "../Form/SearchInput";
import useGenre from "../../hooks/UseGenre";
import "../../assets/stylings/Navbar.css";

import LogoImg from "../../assets/images/logo.png";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const genres = useGenre();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setIsUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="desktop-nav h-32">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="px-3 py-2">
                <Link to="/">
                  <img className="h-24 w-24 my-10" src={LogoImg} alt="Logo" />
                </Link>
              </div>

              <div className="nav-links relative ml-4" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
                >
                  Genres &nbsp;
                  {isDropdownOpen ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu absolute z-10 mt-2 w-32 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {genres.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/genre/${c.slug}`}
                          className="border-b-pink-900 block px-4 py-2 md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="nav-links relative ml-4">
                <Link
                  to="/all-authors"
                  className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
                >
                  Authors
                </Link>
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
                className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
              >
                <FontAwesomeIcon icon={faHeart} title="Wishlist" />
              </Link>
              <Badge count={cart?.length} color="rgb(157 23 77)">
                <Link
                  to="/cart"
                  className="mr-2 text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faCartShopping} title="Cart" />
                </Link>
              </Badge>

              {!auth.user ? (
                <Link
                  to="/login"
                  className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faUser} title="User Dashboard" />
                </Link>
              ) : (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="text-pink-800 hover:border-b border-pink-800 hover:text-pink-950 px-3 py-2 md:text-lg text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faUser} title="User Dashboard" />
                    &nbsp;
                    {isUserDropdownOpen ? (
                      <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
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
                          className="block px-4 py-2 md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2 md:text-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile-nav">
        <div className="max-w-7xl mx-auto p-4">
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
                  to="/cart"
                  className="block text-pink-800 hover:text-pink-950 py-2 md:text-lg text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faCartShopping} title="Cart" /> Cart
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
