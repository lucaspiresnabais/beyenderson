import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const users = [];
let refreshTokens = [];

const controller = {
  signup: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log(users);
    res.sendStatus(201);
  },
  login: async (req, res) => {
    const user = users.find((u) => u.username === req.body.username);
    if (!user) return res.status(404).send("User not found");

    const password = req.body.password;
    if (!(await compare(password, user.password))) return res.sendStatus(403);

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
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
  users: (req, res) => {
    res.send(users.find((u) => u.username === req.user.username));
  },
};
export default controller;
