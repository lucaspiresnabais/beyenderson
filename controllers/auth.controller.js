import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const users = [];
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
      expiresIn: "10s",
    });
    res.json({ accessToken });
  },
  users: (req, res) => {
    res.send(users.find((u) => u.username === req.user.username));
  },
};
export default controller;
