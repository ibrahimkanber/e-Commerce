import express from "express";
import User from "../models/userModel.js";
import data from "../data.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"

const userRouter = express.Router();

userRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post("/signin",asyncHandler(
    async(req,res)=>{
       const user=await User.findOne({email:req.body.email})

       if(user){
          if(bcrypt.comparaSync(req.body.password,user.password)){
            res.send({
              _id:user._id,
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
              token:generateToken(user)
            });
            return
          }
       }

       res.status(401).send({message:"invalid email or password"})
    }
))

export default userRouter;
