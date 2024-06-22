import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.ObjectId,
    ref: "Book",
  },
  quantity: {
    type: Number,
    default: 1, // default to 1 if quantity is not provided
  },
});

const orderSchema = new mongoose.Schema(
  {
    products: [orderItemSchema], // array of order items
    payment: {}, // your payment information structure
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
