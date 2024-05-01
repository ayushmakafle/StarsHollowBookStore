import slugify from "slugify";
import AuthorModel from "../models/AuthorModel.js";

export const createAuthorController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    //check if it exists
    const existingAuthor = await AuthorModel.findOne({ name });
    if (existingAuthor) {
      return res.status(200).send({
        success: true,
        message: "author already exists",
      });
    }
    //save
    const author = await new AuthorModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new author created",
      author,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error in author",
    });
  }
};

//update author
export const updateAuthorController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const author = await AuthorModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Author Updated Successfully",
      author,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error while updating author",
    });
  }
};

//get all authors
export const getAllAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.find({});
    res.status(200).send({
      success: true,
      message: "all authors list",
      author,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error getting authors",
    });
  }
};

//single author
export const singleAuthorController = async (req, res) => {
  try {
    const author = await AuthorModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single author success",
      author,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error getting author",
    });
  }
};

//delete author
export const deleteAuthorController = async (req, res) => {
  try {
    const { id } = req.params;
    await AuthorModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "author deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error deleting author",
    });
  }
};
