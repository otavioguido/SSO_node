import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";

const router = express.Router();

// Mock user data
const users = [{ id: 1, username: "user1", password: "pass1" }];

// login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default router;
