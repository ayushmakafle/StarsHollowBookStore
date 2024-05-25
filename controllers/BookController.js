import bookModel from "../models/BookModel.js";
import genreModel from "../models/GenreModel.js";
import AuthorModel from "../models/AuthorModel.js";
import fs from "fs";
import slugify from "slugify";
import mongoose from "mongoose";
import BookModel from "../models/BookModel.js";

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
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !author:
        return res.status(500).send({ error: "author is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !genre:
        return res.status(500).send({ error: "Genre is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
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

// export const updateBookRating = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const { rating } = req.body;
//     const { user } = req;
//     // Find the book by ID
//     const book = await bookModel.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ error: "Book not found" });
//     }
//     // Ensure that book.ratings is an array
//     book.ratings = book.ratings || [];

//     // Update or add the rating given by the doctor
//     const existingRatingIndex = book.ratings.findIndex(
//       (r) => r.doctorId && r.doctorId.toString() === user._id.toString()
//     );
//     if (existingRatingIndex !== -1) {
//       book.ratings[existingRatingIndex].rating = Number(rating);
//     } else {
//       book.ratings.push({ doctorId: user._id, rating: Number(rating) });
//     }

//     book.markModified("ratings");

//     // Filter out ratings without doctorId and calculate average rating

//     const doctorRatings = book.ratings.filter((r) => r._id);
//     const totalRating = doctorRatings.reduce((sum, r) => sum + r.rating, 0);
//     const averageRating =
//       doctorRatings.length > 0 ? totalRating / doctorRatings.length : 0;

//     // Update the averageRating field in the book model
//     book.averageRating = averageRating;
//     console.log("doctorRatings:", doctorRatings);
//     console.log("totalRating:", totalRating);
//     console.log("averageRating:", averageRating);
//     // Save the changes
//     await book.save();

//     // Send a response back to the client
//     res.json({ success: true, book });
//   } catch (error) {
//     console.error("Error updating book rating:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const bookStockUpdate = async (req, res) => {
  try {
    const { slug, quantityToBuy } = req.body;

    // Parse quantityToBuy as a number
    const quantityToBuyNumber = parseInt(quantityToBuy);

    // Find the book by its slug
    const book = await bookModel.findOne({ slug: slug });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Check if the available quantity is sufficient for the purchase
    if (book.quantity < quantityToBuyNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient quantity in stock" });
    }

    // Update the quantity by subtracting the quantity being purchased
    book.quantity = quantityToBuyNumber;

    // Save the updated book
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

    // Find books by IDs and retrieve their quantities
    const books = await bookModel.find({ _id: { $in: bookIds } });
    const quantities = {};
    books.forEach((book) => {
      quantities[book._id] = book.quantity;
    });

    res.json({ quantities });
  } catch (error) {
    console.error("Error fetching book quantities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
