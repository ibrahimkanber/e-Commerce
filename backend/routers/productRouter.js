import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controlers/productController.js";
const productRouter = express.Router();

productRouter.get("/categories",getCategories)

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const name = req.query.name || "";
    const category = req.query.category || "";
    console.log("category:==>",category)
    const sellerFilter = seller ? { seller } : {};
    const nameFilter = name ? { name:{$regex: name,$options:'i'} } : {};
    const categoryFilter=category ? { category } : {};
    const products = await Product.find({ ...sellerFilter,...nameFilter,...categoryFilter}).populate(
      "seller",
      "seller.name seller.logo"
    );

    res.send(products);
  })
);

productRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);



productRouter.post("/", isAuth, isSellerOrAdmin, createProduct);

productRouter.put("/:id", isAuth, isSellerOrAdmin, updateProduct);

productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);

export default productRouter;
