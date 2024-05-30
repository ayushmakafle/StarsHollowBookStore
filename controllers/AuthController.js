import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/UserModel.js";
import orderModel from "../models/OrderModel.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
      address,
    } = req.body;
    //validations
    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phoneNumber) {
      return res.send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      address,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    /* if (user.isEmailVerified !== 1) {
      return res.status(200).send({
        success: false,
        message: "Your email isn't verified",
      });
    } */
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in user login",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send("protected route");
};

export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0 });

    res.status(200).json({
      success: true,
      user: users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
    } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        password: hashedPassword || user.password,
        phoneNumber: phoneNumber || user.phoneNumber,
        address: address || user.address,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating profile",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};

export default {
  registerController,
  loginController,
  testController,
  getUsersController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
};
