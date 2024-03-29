import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import authRouter from "./routes/auth.route.js";
import hostRouter from "./routes/host.route.js";
import venueRouter from "./routes/venue.route.js";
import { connectToDb } from "./utils/db.util.js";

connectToDb();
const app = express();
const port = 3000;

app.use(json());
app.use(authRouter);
app.use(venueRouter);
app.use(hostRouter);

app.listen(port, () => {});
