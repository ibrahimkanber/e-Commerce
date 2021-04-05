import express from "express";
import { register, seed, signIn, userDetail,updateUserProfile } from "../controlers/userControllers.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/seed",seed);

userRouter.post("/signin",signIn);

userRouter.post("/register",register);

userRouter.get("/:id",isAuth,userDetail);

userRouter.put("/profile",isAuth,updateUserProfile)

export default userRouter;
