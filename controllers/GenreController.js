import slugify from "slugify";
import GenreModel from "../models/GenreModel.js";

export const createGenreController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    //check if it exists
    const existingGenre = await GenreModel.findOne({ name });
    if (existingGenre) {
      return res.status(200).send({
        success: true,
        message: "genre already exists",
      });
    }
    //save
    const genre = await new GenreModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new genre created",
      genre,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error in genre",
    });
  }
};

//update genre
export const updateGenreController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const genre = await GenreModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Genre Updated Successfully",
      genre,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error while updating genre",
    });
  }
};

//get all genres
export const getAllGenre = async (req, res) => {
  try {
    const genre = await GenreModel.find({});
    res.status(200).send({
      success: true,
      message: "all genres list",
      genre,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error getting genres",
    });
  }
};

//single genre
export const singleGenreController = async (req, res) => {
  try {
    const genre = await GenreModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single genre success",
      genre,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error getting genre",
    });
  }
};

//delete genre
export const deleteGenreController = async (req, res) => {
  try {
    const { id } = req.params;
    await GenreModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "genre deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error deleting genre",
    });
  }
};
