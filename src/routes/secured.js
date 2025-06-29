import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

// secured endpoint
router.get("/data", authenticateToken, (req, res) => {
  res.json({ message: "This is a secured route", user: req.user });
});

export default router;
