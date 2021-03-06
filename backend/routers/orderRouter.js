import express from "express";
import asyncHandler from "express-async-handler";
import {
  getOrderDetail,
  updateOrder,
  getOrderHistoryList,
  getAllOrders,
  deleteOrder,
  deliverOrder,
} from "../controlers/orderController.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../middlewares/authMiddleware.js";
import Order from "../models/orderModel.js";
const orderRouter = express.Router();

orderRouter.get("/orderlist", isAuth, getOrderHistoryList);
orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get("/:id", isAuth, getOrderDetail);

orderRouter.get("/", isAuth, isSellerOrAdmin, getAllOrders);

orderRouter.put("/:id/pay", isAuth, updateOrder);

orderRouter.put("/:id/deliver", isAuth, isAdmin, deliverOrder);

orderRouter.delete("/:id", isAuth, isAdmin, deleteOrder);

export default orderRouter;
