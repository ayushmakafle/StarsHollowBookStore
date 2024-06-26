import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import { useWishlist } from "../../context/wishlist";

import BookShelfImg from "../../assets/images/books-bookshelf-isolated-vector.png";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [productQuantities, setProductQuantities] = useState({});
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [wishlist, setWishlist] = useWishlist();

  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += (item.price ?? 0) * item.numberOfItems;
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

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/book/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/book/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      await updateProductQuantities();
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddToWishlist = (p) => {
    const updatedWishlist = [...wishlist];
    const existingProduct = updatedWishlist.find((item) => item._id === p._id);
    if (existingProduct) {
      existingProduct.numberOfItems += 1;
    } else {
      updatedWishlist.push({
        _id: p._id,
        name: p.name,
        author: p.author.name,
        price: p.price,
        numberOfItems: 1,
      });
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Book added to wishlist");
  };

  const updateProductQuantities = async () => {
    try {
      await Promise.all(
        cart.map(async (item) => {
          console.log("Updating quantity for item:", item);
          const quantityToBuy = item.numberOfItems;
          await axios.put("/api/v1/book/updateStock", {
            slug: item.slug,
            quantityToBuy: quantityToBuy,
          });
          console.log("Product quantity updated successfully for item:", item);
        })
      );

      console.log("Product quantities updated successfully");
    } catch (error) {
      console.error("Error updating product quantities:", error);
    }
  };

  useEffect(() => {
    const fetchProductQuantities = async () => {
      try {
        const bookIds = cart.map((item) => item._id);
        const response = await axios.post("/api/v1/book/getQuantities", {
          bookIds,
        });
        const quantities = response.data.quantities;
        setProductQuantities(quantities);
      } catch (error) {
        console.error("Error fetching product quantities:", error);
      }
    };

    fetchProductQuantities();
  }, [cart]);

  return (
    <Layout>
      <button className="m-4" onClick={goBack}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ color: "#800000", height: "40px", margin: "4px" }}
        />
      </button>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="w-full lg:w-3/5">
            <div className="flex justify-between items-end mb-6">
              <h4 className="bona md:text-xl text-sm text-pink-700 mb-4">
                {cart?.length ? (
                  <>
                    <h2 className="londrina-color text-3xl mb-2">Book Bag </h2>
                    You have{" "}
                    <span className="font-bold">
                      {cart.length}&nbsp;books
                    </span>{" "}
                    in your bag {auth?.token ? "" : "Please login to checkout"}
                  </>
                ) : (
                  <>
                    <p className="londrina-color text-center text-3xl">
                      Your cart is empty.
                    </p>
                    <div className="mb-5 genres w-[60vw] mx-auto flex flex-col justify-center items-center">
                      <img src={BookShelfImg} />
                      <button className="text-white bg-pink-800 hover:bg-pink-900 md:text-xl text-lg md:p-5 p-1 rounded-lg font-semibold">
                        <Link to={"/AllBooks"}>
                          Browse Our Selection of Books
                        </Link>
                      </button>
                    </div>
                  </>
                )}
              </h4>
            </div>
            <div>
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between border-b border-pink-800 py-2"
                >
                  <div className="flex">
                    <div className="py-4 md:px-4 px-1">
                      <img
                        src={`/api/v1/book/book-photo/${p._id}`}
                        alt={p.name}
                        className="md:w-[130px] w-[100px] h-full rounded-md shadow-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-4 md:px-4 px-2">
                      <div className="flex flex-col">
                        <span className="font-bold md:text-2xl text-lg">
                          {p.name}
                        </span>
                        <span className="text-gray-600 md:text-xl text-base">
                          {p.author}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="border border-gray-300 rounded-md shadow-lg md:text-2xl text-xl">
                          <button
                            className="md:px-2 px-1 md:py-1 py-0"
                            onClick={() => updateQuantity(p._id, "decrement")}
                          >
                            -
                          </button>
                          <span className="md:mx-4 mx-2 md:text-xl text-lg font-semibold">
                            {p.numberOfItems}
                          </span>
                          <button
                            className="md:px-2 px-1 md:py-1 py-0"
                            onClick={() => updateQuantity(p._id, "increment")}
                            disabled={
                              productQuantities[p._id] - p.numberOfItems === 0
                            }
                          >
                            +
                          </button>
                        </div>
                        {productQuantities[p._id] - p.numberOfItems === 0 && (
                          <span className="text-red-800 ml-2 text-base">
                            No more left in stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end my-4">
                    <div className="md:text-2xl text-lg font-bold">
                      ${(p.price ?? 0).toFixed(2)}
                    </div>
                    <div className="flex xl:flex-row flex-col gap-2 items-end">
                      <button
                        className="text-pink-800 hover:text-pink-900 font-semibold flex gap-1 items-center md:text-sm text-xs"
                        onClick={() => removeCartItem(p._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="" />
                        Remove
                      </button>
                      <button
                        className="text-pink-800 hover:text-pink-900 font-semibold flex gap-1 items-center md:text-sm text-xs"
                        onClick={() => handleAddToWishlist(p)}
                      >
                        <FontAwesomeIcon icon={faHeart} className="" />
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/4 lg:pl-4 mt-4 lg:mt-0">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="border-b border-pink-800 py-4">
                <h2 className="londrina-color text-2xl font-semibold mb-4">
                  Order Summary
                </h2>
                <h4 className="flex justify-between text-xl mb-2">
                  <span className="text-gray-600 text-lg">Subtotal</span>
                  <span className="font-bold text-pink-900">
                    {totalPrice()}
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
                    onClick={() => setCheckout(true)}
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
                      className="bg-pink-800 text-white px-4 py-2 rounded mt-2"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {checkout &&
                  (!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="bg-pink-800 text-white px-4 py-2 rounded mt-2"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
