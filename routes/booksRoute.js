import { Router } from "express";
//import Book from '../models/BookModel.js';
import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createBookController,
  deleteBookController,
  getBookController,
  getBookQuantities,
  getSingleBookController,
  bookGenreController,
  bookCountController,
  bookFiltersController,
  bookListController,
  bookPhotoController,
  bookStockUpdate,
  relatedBookController,
  searchBookController,
  updateBookController,
  bookAuthorController,
  getLatestBooks,
} from "../controllers/BookController.js";
import formidable from "express-formidable";
import route from "color-convert/route.js";

const router = express.Router();

// Create book
router.post(
  "/create-book",
  requireSignIn,
  isAdmin,
  formidable(),
  createBookController
);

//get books
router.get("/get-book", getBookController);

//get one book
router.get("/get-book/:slug", getSingleBookController);

//get photo
router.get("/book-photo/:pid", bookPhotoController);

//delete book
router.delete(
  "/delete-book/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  deleteBookController
);

//update book
router.put(
  "/update-book/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateBookController
);

//filter book
router.post("/book-filters", bookFiltersController);

//book count
router.get("/book-count", bookCountController);

//book per page
router.get("/book-list/:page", bookListController);

//search book
router.get("/search/:keyword", searchBookController);

//similar book
router.get("/related-book/:pid/:cid", relatedBookController);

//genre wise book
router.get("/book-genre/:slug", bookGenreController);

//genre wise book
router.get("/book-author/:slug", bookAuthorController);

router.get("/latest", getLatestBooks);

// Route to update book rating
// router.post("/rate/:bookId", requireSignIn, isDoctor, updateBookRating);

router.post("/getQuantities", getBookQuantities);

//update quantity when users buys
router.put("/updateStock", bookStockUpdate);

export default router;
