import express from "express";
import AuthController from "../controllers/AuthController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.registerController);

router.post("/login", AuthController.loginController);

router.get("/test", requireSignIn, isAdmin, AuthController.testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
