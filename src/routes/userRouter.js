import express from "express";
import {
  getAllusers,
  signupUser,
  loginUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);


export default userRouter;
