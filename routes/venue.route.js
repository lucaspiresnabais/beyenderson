import express from "express";
import venueController from "../controllers/venue.controller.js";
import { authenticateToken } from "../utils/auth.util.js";

const venueRouter = express.Router();

venueRouter.post("/venues/create", venueController.create);
venueRouter.patch("/venues/:id", venueController.edit);
venueRouter.delete("/venues/:id", venueController.delete);
venueRouter.get("/venues/:id", venueController.venueById);
venueRouter.patch("/venues/addHost/:id", venueController.addHost);
venueRouter.patch("/venues/removeHost/:id", venueController.removeHost);

export default venueRouter;
