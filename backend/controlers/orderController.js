import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"
export const getOrderDetail=asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id)

    if(order){
        res.send(order)
    }else{
        res.status(404).send({message:"Order not found"})
    }
})

export const updateOrder=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address
        
        };

        const updatedOrder= await order.save()
        res.send({message:"Order paid",order:updatedOrder})
    }else{
        res.status(404).send({message:"Order not found"})
    }

})

export const getOrderHistoryList=asyncHandler(async(req,res)=>{
    
    const orders=await Order.find({user:req.user._id})
    res.send(orders)


})

export const getAllOrders=asyncHandler(async(req,res)=>{
    
    const orders=await Order.find({}).populate("user","name")
    res.send(orders)


})

