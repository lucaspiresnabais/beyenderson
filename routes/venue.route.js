import express from "express";
import venueController from "../controllers/venue.controller.js";
import { authenticateToken } from "../utils/auth.util.js";

const venueRouter = express.Router();

venueRouter.post("/venues/create", venueController.create);
venueRouter.patch("/venues/edit", venueController.edit);
/* authRouter.get("/venues");
authRouter.get("/venues/:id");
authRouter.delete("/venues/:id", authController.logout);  */

export default venueRouter;
