import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createGenreController,
  deleteGenreController,
  getAllGenre,
  singleGenreController,
  updateGenreController,
} from "../controllers/GenreController.js";

const router = express.Router();

//routes
router.post("/create-genre", requireSignIn, isAdmin, createGenreController);

//update genre
router.put("/update-genre/:id", requireSignIn, isAdmin, updateGenreController);

//get all genre
router.get("/get-genre", getAllGenre);

//single genre
router.get("/single-genre/:slug", singleGenreController);

//delete genre
router.delete(
  "/delete-genre/:id",
  requireSignIn,
  isAdmin,
  deleteGenreController
);

export default router;
