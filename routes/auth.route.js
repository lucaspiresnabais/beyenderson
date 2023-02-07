import express from "express";
import authController from "../controllers/auth.controller.js";
import { authenticateToken } from "../utils/auth.util.js";

const authRouter = express.Router();

authRouter.post("/users/signup", authController.signup);
authRouter.get("/users/login", authController.login);
authRouter.post("/users/token", authController.token);
authRouter.delete("/users/logout", authController.logout);

authRouter.get("/users", authController.users);

export default authRouter;
