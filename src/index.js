import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js"
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use('/api/blog', blogRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });