import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js"
import { connectDB } from "./config/db.js";
// import { generateJwtToken, verifyJwtToken } from "./services/jwtToken.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use('/api/blog', blogRouter)
// console.log(blogRouter);

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

// let myToken = generateJwtToken('admin@mail.com')
// console.log('Generated Token: ', myToken)
// console.log('<------------------->');
// console.log('Verified Token: ', verifyJwtToken(myToken))

// Connect to MongoDB database
// mongoose
//   .connect(
//     "mongodb+srv://numandotdev:VXukuiBREMSVtYmr@cluster0.mvuaqzt.mongodb.net/"
//   )
//   .then(() => app.listen(PORT))
//   .then(() =>
//     console.log("MongoDB connected and Server is running on port " + PORT)
//   )
//   .catch((err) => console.error(err));
