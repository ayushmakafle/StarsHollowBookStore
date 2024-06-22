import express from "express";
import AuthController from "../controllers/AuthController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.registerController);

router.get("/verify", AuthController.userVerifyMail);

router.post("/login", AuthController.loginController);

router.get("/test", requireSignIn, isAdmin, AuthController.testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//get users
router.get("/get-user", AuthController.getUsersController);

router.put("/profile", requireSignIn, AuthController.updateProfileController);

router.get("/orders", requireSignIn, AuthController.getOrdersController);

router.get("/all-orders", AuthController.getAllOrdersController);

router.post("/forget", AuthController.forgetLoad);

router.post("/reset-password", AuthController.resetPassword);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  AuthController.orderStatusController
);

export default router;
