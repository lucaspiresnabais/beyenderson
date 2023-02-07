import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const controller = {
  signup: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const hashedPassword = await hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.sendStatus(201);
    } catch (e) {}
  },
  login: async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const password = req.body.password;
    if (!(await compare(password, user.password))) return res.sendStatus(403);

    const accessToken = jwt.sign(
      user.toJSON(),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      user.toJSON(0),
      process.env.REFRESH_TOKEN_SECRET
    );

    res.json({ accessToken, refreshToken });
  },
  token: (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { username: user.username, password: user.password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20s" }
      );
      res.json({ accessToken });
    });
  },
  logout: (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  },
  users: async (req, res) => {
    const user = await User.findById("63e135d092ef710459186729");
  },
};
export default controller;
