import React from "react";
import Layout from "../Layout/Layout";
import { useWishlist } from "../../context/wishlist";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useWishlist();
  const [cart, setCart] = useCart();

  const handleAddToCart = (book) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item._id === book._id);
    if (existingProduct) {
      existingProduct.numberOfItems += 1;
    } else {
      updatedCart.push({
        _id: book._id,
        name: book.name,
        author: book.author,
        price: book.price,
        numberOfItems: 1,
      });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Book added to cart");
  };

  const handleRemoveFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== book._id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Book removed from wishlist");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">Image</th>
                  <th className="py-2 px-4 border-b border-gray-200">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200">Price</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Add to Cart
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((book) => (
                  <tr key={book._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img
                        src={`/api/v1/book/book-photo/${book._id}`}
                        alt={book.name}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {book.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      ${book.price}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        className="bg-pink-800 text-white px-2 py-1 rounded"
                        onClick={() => handleAddToCart(book)}
                      >
                        <FontAwesomeIcon icon={faCartPlus} />
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveFromWishlist(book)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
