import express from "express";
import { register, signIn } from "../controlers/userControlers.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  
);

userRouter.post("/signin",signIn);

userRouter.post("/register",register);

export default userRouter;
