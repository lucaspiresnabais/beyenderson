import express from "express";
import hostController from "../controllers/host.controller.js";
import { authenticateToken } from "../utils/auth.util.js";

const hostRouter = express.Router();

hostRouter.get("/hosts/:id", hostController.hostById);

export default hostRouter;
