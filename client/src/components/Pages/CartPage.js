import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faGift,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "antd";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [productQuantities, setProductQuantities] = useState({});
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price * item.numberOfItems;
      });

      if (isGiftWrap) {
        total += 0.5;
      }

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (productId) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (productId, action) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        if (action === "increment") {
          return { ...item, numberOfItems: item.numberOfItems + 1 };
        } else if (action === "decrement" && item.numberOfItems > 1) {
          return { ...item, numberOfItems: item.numberOfItems - 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleGiftWrapChange = (e) => {
    setIsGiftWrap(e.target.checked);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <button className="m-4" onClick={goBack}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          className="text-pink-700 text-2xl"
        />
      </button>
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-pink-800 mb-2">
            {`Hello ${auth?.token && auth?.user?.username}!`}
          </h2>
          <h4 className="text-xl text-pink-700 mb-4">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : " Your Cart Is Empty"}
          </h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="w-full lg:w-3/5">
            <div>
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between border-b border-pink-800"
                >
                  <div className="flex">
                    <div className="py-4 px-4">
                      <img
                        src={`/api/v1/book/book-photo/${p._id}`}
                        alt={p.name}
                        className="w-[130px] h-full rounded-md shadow-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-2xl">{p.name}</span>
                        <span className="text-gray-600 text-xl">
                          {p.author}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="border border-gray-300 rounded-md shadow-lg text-2xl">
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(p._id, "decrement")}
                          >
                            -
                          </button>
                          <span className="mx-4 text-xl font-semibold">
                            {p.numberOfItems}
                          </span>
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(p._id, "increment")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end my-4">
                    <div className="text-2xl font-bold">
                      $ {p.price.toFixed(2)} /-
                    </div>
                    <div>
                      <button
                        className="text-pink-800 hover:text-pink-900 font-semibold mx-2"
                        onClick={() => removeCartItem(p._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mx-2" />
                        Remove
                      </button>
                      <button
                        className="text-pink-800 hover:text-pink-900 font-semibold mx-2"
                        onClick={() => removeCartItem(p._id)}
                      >
                        <FontAwesomeIcon icon={faHeart} className="mx-2" />
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/4 lg:pl-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="border-b border-pink-800 py-4">
                <h2 className="text-2xl font-semibold text-pink-800 mb-4">
                  Order Summary
                </h2>
                <h4 className="flex justify-between text-xl mb-2">
                  <span className="text-gray-600 text-lg">Subtotal</span>
                  <span className="font-bold text-pink-900">
                    {totalPrice()} /-
                  </span>
                </h4>
              </div>
              <div className="border-b border-pink-800 py-4 flex justify-between">
                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faGift}
                    className="h-10 text-pink-800"
                  />
                  <div className="flex flex-col">
                    <p>Is this a gift&nbsp;?</p>
                    <p> +&nbsp;$0.50 for gift wrap</p>
                  </div>
                </div>
                <div>
                  <Checkbox onChange={handleGiftWrapChange} />
                </div>
              </div>
              {auth?.user?.address ? (
                <div className="flex flex-col">
                  <h4 className="text-lg mb-2">
                    Current Address:{" "}
                    <span className="font-bold text-pink-900">
                      {auth?.user?.address}
                    </span>
                  </h4>
                  <button
                    className="bg-pink-900 text-white px-4 py-2 rounded mt-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    className="bg-pink-900 text-white px-4 py-2 rounded mt-2"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {auth?.token ? (
                    <button
                      className="bg-pink-700 text-white px-4 py-2 rounded mt-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="bg-pink-700 text-white px-4 py-2 rounded mt-2"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
