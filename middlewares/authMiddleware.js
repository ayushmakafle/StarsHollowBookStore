import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("Decoded User:", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
