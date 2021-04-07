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
  createProductReview,
} from "../controlers/productController.js";
const productRouter = express.Router();

productRouter.get("/categories", getCategories);

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const name = req.query.name || "";
    const category = req.query.category || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const sellerFilter = seller ? { seller } : {};

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }).populate("seller", "seller.name seller.logo").sort(sortOrder);

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

productRouter.post("/:id/reviews", isAuth,createProductReview );

productRouter.put("/:id", isAuth, isSellerOrAdmin, updateProduct);

productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);

export default productRouter;
