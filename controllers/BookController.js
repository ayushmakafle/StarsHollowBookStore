import bookModel from "../models/BookModel.js";
import genreModel from "../models/GenreModel.js";
import AuthorModel from "../models/AuthorModel.js";
import fs from "fs";
import slugify from "slugify";
import mongoose from "mongoose";
import BookModel from "../models/BookModel.js";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";

import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createBookController = async (req, res) => {
  try {
    const { name, description, price, genre, quantity, shipping, author } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !author:
        return res.status(500).send({ error: "Author is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !genre:
        return res.status(500).send({ error: "Genre is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo:
        return res.status(500).send({ error: "photo is Required" });
    }

    const books = new bookModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      books.photo.data = fs.readFileSync(photo.path);
      books.photo.contentType = photo.type;
    }
    await books.save();
    res.status(201).send({
      success: true,
      message: "Book Created Successfully",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating book",
    });
  }
};

//get all books
export const getBookController = async (req, res) => {
  try {
    const books = await bookModel
      .find({})
      .populate("genre")
      .populate("author")

      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: books.length,
      message: "AllBooks ",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting books",
      error: error.message,
    });
  }
};
// get single book
export const getSingleBookController = async (req, res) => {
  try {
    const book = await bookModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("genre")
      .populate("author");

    // Fetch additional information like available quantity
    const availableQuantity = book.quantity; // Assuming available quantity is stored in the book document

    // Include available quantity in the response
    res.status(200).send({
      success: true,
      message: "Single Book Fetched",
      book: {
        ...book.toObject(),
        availableQuantity: availableQuantity,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single book",
      error,
    });
  }
};

// get photo
export const bookPhotoController = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.pid).select("photo");
    if (book.photo.data) {
      res.set("Content-type", book.photo.contentType);
      return res.status(200).send(book.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteBookController = async (req, res) => {
  try {
    await bookModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Book Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting book",
      error,
    });
  }
};

//update books
export const updateBookController = async (req, res) => {
  try {
    const { name, description, price, genre, quantity, shipping, author } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(501).send({ error: "Name is Required" });
      case !description:
        return res.status(502).send({ error: "Description is Required" });

      case !price:
        return res.status(504).send({ error: "Price is Required" });
      case !genre:
        return res.status(505).send({ error: "Genre is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(506)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const books = await bookModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      books.photo.data = fs.readFileSync(photo.path);
      books.photo.contentType = photo.type;
    }
    await books.save();
    res.status(201).send({
      success: true,
      message: "Book Updated Successfully",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update book",
    });
  }
};

//book filters controller
export const bookFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.genre = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const books = await bookModel.find(args);
    res.status(200).send({
      success: true,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Books",
      error,
    });
  }
};

//book count controller
export const bookCountController = async (req, res) => {
  try {
    const total = await bookModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error counting Books",
      error,
    });
  }
};

//book list based on page
export const bookListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const books = await bookModel
      .find({})
      .select("-photo")
      .populate("author")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in page control",
      error,
    });
  }
};

//search book
export const searchBookController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await bookModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo")
      .populate("author");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search book api",
      error,
    });
  }
};

//related books
export const relatedBookController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const books = await bookModel
      .find({
        genre: cid,
        _id: { $ne: pid }, //ne means not included
      })
      .select("-photo")
      .limit(3)
      .populate("genre")
      .populate("author");
    res.status(200).send({
      success: false,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related books",
      error,
    });
  }
};

//get book by genre
export const bookGenreController = async (req, res) => {
  try {
    const genre = await genreModel.findOne({ slug: req.params.slug });
    const books = await bookModel
      .find({ genre })
      .populate("genre")
      .populate("author");
    res.status(200).send({
      success: true,
      genre,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting books",
    });
  }
};

export const bookAuthorController = async (req, res) => {
  try {
    const author = await AuthorModel.findOne({ slug: req.params.slug });
    const books = await bookModel
      .find({ author })
      .populate("author")
      .populate("genre");
    res.status(200).send({
      success: true,
      author,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting books",
    });
  }
};

export const getLatestBooks = async (req, res) => {
  try {
    // Query the database to fetch the last 4 books
    const latestBooks = await BookModel.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("author");

    res.json({ success: true, books: latestBooks });
  } catch (error) {
    console.error("Error fetching latest books:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const bookStockUpdate = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Ensure request body is logged
    const { slug, quantityToBuy } = req.body;

    if (!slug || !quantityToBuy) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const quantityToBuyNumber = parseInt(quantityToBuy);

    const book = await bookModel.findOne({ slug: slug });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found for slug: " + slug });
    }

    if (book.quantity < quantityToBuyNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient quantity in stock" });
    }

    // Update the book quantity
    book.quantity -= quantityToBuyNumber;

    await book.save();

    res.json({
      success: true,
      message: "Quantity updated successfully",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookQuantities = async (req, res) => {
  try {
    const { bookIds } = req.body;
    console.log("Received book IDs:", bookIds); // Debugging log

    if (!bookIds || !Array.isArray(bookIds)) {
      return res.status(400).json({ error: "Invalid book IDs format" });
    }

    // Find books by IDs and retrieve their quantities
    const books = await bookModel.find({ _id: { $in: bookIds } });
    const quantities = {};
    books.forEach((book) => {
      quantities[book._id] = book.quantity;
    });
    console.log("Book quantities:", quantities);

    res.json({ quantities });
  } catch (error) {
    console.error("Error fetching book quantities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
