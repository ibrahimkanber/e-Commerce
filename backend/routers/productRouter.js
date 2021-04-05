import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js"
import {isAdmin,isAuth} from "../middlewares/authMiddleware.js"
import { createProduct ,updateProduct,deleteProduct} from "../controlers/productController.js";
const productRouter=express.Router()

productRouter.get("/",asyncHandler(
    async(req,res)=>{
        const products=await Product.find({})
        
        res.send(products)
    }
))


productRouter.get("/seed",
    asyncHandler(
        async(req,res)=>{

            const createdProducts=await Product.insertMany(data.products)
            res.send({createdProducts})
        }
    )
)

productRouter.get("/:id",asyncHandler(
    async(req,res)=>{
        const product=await Product.findById(req.params.id)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:"Product not found"})
        }
    }
))


productRouter.post("/",isAuth,isAdmin,createProduct)

productRouter.put("/:id",isAuth,isAdmin,updateProduct)

productRouter.delete("/:id",isAuth,isAdmin,deleteProduct)






export default productRouter;