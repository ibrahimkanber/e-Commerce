import express from "express";
import {
  register,
  seed,
  signIn,
  userDetail,
  updateUserProfile,
  getUserList,
  deleteUser,
  updateUserFromAdminPanel,
  getTopSellers
} from "../controlers/userControllers.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/seed", seed);

userRouter.post("/signin", signIn);

userRouter.post("/register", register);

userRouter.get("/top-sellers", getTopSellers);


userRouter.get("/:id", isAuth, userDetail);

userRouter.put("/profile", isAuth, updateUserProfile);

userRouter.put("/:id", isAuth, isAdmin, updateUserFromAdminPanel);


userRouter.get("/", isAuth, isAdmin, getUserList);


userRouter.delete("/:id", isAuth, isAdmin, deleteUser);

export default userRouter;
