import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import data from "../data.js";

export const seed = asyncHandler(async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export const signIn = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller:user.isSeller,
        token: generateToken(user),
      });
      return;
    }
  }

  res.status(401).send({ message: "invalid email or password" });
});

export const register = asyncHandler(async (req, res) => {
  const user = await User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const createdUser = await user.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isSeller:user.isSeller,
    token: generateToken(createdUser),
  });
});

export const userDetail = asyncHandler(async (req,res) => {
  console.log(req.params.id)
  const user=await User.findById(req.params.id)

  if(user){
      res.send(user);
  }else{
    res.status(404).send({message:"User not found"})
  }



});
export const updateUserProfile = asyncHandler(async (req,res) => {
  const user=await User.findById(req.user._id)
  

  if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
  
      if(user.isSeller){
        user.seller.name=req.body.sellerName || user.seller.name,
        user.seller.logo=req.body.sellerLogo || user.seller.logo,
        user.seller.description=req.body.sellerDescription || user.seller.description
        
      }
      if(req.body.password){
        user.password=bcrypt.hashSync(req.body.password,8)
      }

    const updatedUser=await user.save()
    res.send({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      isSeller:user.isSeller,
      token:generateToken(updatedUser)

    })
  }else{
    res.status(404).send({message:"User not found"})
  }

});


export const getUserList = asyncHandler(async (req,res) => {
 
  const users=await User.find({})

  res.send(users)

});

export const deleteUser = asyncHandler(async (req,res) => {
 
  const user=await User.findById(req.params.id)

  if(user){
    if(user.isAdmin){
      res.status(400).send({message:"Can Nort delete Admin User"})
      return
    }
    const deletedUser= await user.remove()

    res.send({message:"User deleted",user:deletedUser})

  }else{
    res.status(404.).send({message:"User not found"})

  }


});


export const updateUserFromAdminPanel = asyncHandler(async (req,res) => {
  const user=await User.findById(req.params.id)

  if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin|| user.isAdmin;
      if(req.body.password){
        user.password=bcrypt.hashSync(req.body.password,8)
      }

    const updatedUser=await user.save()
    res.send({message:"User Updated",user:updatedUser})
  }else{
    res.status(404).send({message:"User not found"})
  }

});
