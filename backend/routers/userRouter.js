import express from "express";
import { register, seed, signIn } from "../controlers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/seed",seed);

userRouter.post("/signin",signIn);

userRouter.post("/register",register);

export default userRouter;
