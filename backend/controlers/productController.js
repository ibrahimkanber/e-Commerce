import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  console.log("deneme")
  const product = new Product({
    name: "Sample Product",
    category: "sample category",
    image: "/images/p1.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality product",
  });

  const createdProduct= await product.save()

  res.send({message:"Product created",product:createdProduct})

});
export const updateProduct = asyncHandler(async (req, res) => {
  
  const productId=req.params.id

  const product=await Product.findById(productId)

  if(product){
    product.name=req.body.name
    product.price=req.body.price
    product.image=req.body.image
    product.brand=req.body.brand
    product.countInStock=req.body.countInStock
    product.description=req.body.description

    const updatedProduct=await product.save()

    res.send({message:"Product updated",product:updateProduct})
  }else{
    res.status(404.).send({message:"Product not found"})

  }

});

export const deleteProduct = asyncHandler(async (req, res) => {
  
  const productId=req.params.id

  const product=await Product.findById(productId)

  if(product){

    const deletedProduct= await product.remove()

    res.send({message:"Product deleted",product:deletedProduct})

  }else{
    res.status(404.).send({message:"Product not found"})

  }

});
