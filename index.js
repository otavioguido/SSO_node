import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/auth.js";
import securedRoutes from "./src/routes/secured.js";
import { PORT } from "./config.js";

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/secured", securedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
