import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createAuthorController,
  deleteAuthorController,
  getAllAuthor,
  singleAuthorController,
  updateAuthorController,
} from "../controllers/AuthorController.js";

const router = express.Router();

//routes
router.post("/create-author", requireSignIn, isAdmin, createAuthorController);

//update author
router.put(
  "/update-author/:id",
  requireSignIn,
  isAdmin,
  updateAuthorController
);

//get all author
router.get("/get-author", getAllAuthor);

//single author
router.get("/single-author/:slug", singleAuthorController);

//delete author
router.delete(
  "/delete-author/:id",
  requireSignIn,
  isAdmin,
  deleteAuthorController
);

export default router;
