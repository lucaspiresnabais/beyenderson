import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import authRouter from "./routes/auth.route.js";

const app = express();
const port = 3000;

app.use(json());
app.use(authRouter);

app.listen(port, () => {});
