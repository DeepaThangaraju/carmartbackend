import { orderModel } from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

export function addOrder() {
  return asyncHandler(async (req, res) => {
    const {
      orderItem,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItem && orderItem.length === 0) {
      res.status(401);
      throw new Error("No Ordered Car");
      return;
    } else {
      const order = new orderModel({
        orderItem,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      const orderCreated = await order.save();

      res.status(201).json(orderCreated);
    }
  });
}

export function getOrderById() {
  return asyncHandler(async (req, res) => {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");
      if(order){
        res.json(order)
      }else{
        res.status(401)
        throw new Error("Order not found")
      }
  });
}

export function updateOrderToPaid() {
  return asyncHandler(async (req, res) => {
    const order = await orderModel
      .findById(req.params.id)
      if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
          id:req.body.id,
          status:req.body.status,
          update_time:req.body.update_time,
          email_address:req.body.payer.email_address
        }
        const updatedOrder=await order.save();
        res.json(updatedOrder)
      }else{
        res.status(401)
        throw new Error("Order not found")
      }
  });
}


export function getMyOrders() {
  return asyncHandler(async (req, res) => {
    const orders = await orderModel
      .find({user:req.user._id});
      res.json(orders)
     
  });
}

export function getOrders() {
  return asyncHandler(async (req, res) => {
    const orders = await orderModel
      .find({}).populate('user','id name');
      res.json(orders)
     
  });
}


export function updateOrderToDelivered() {
  return asyncHandler(async (req, res) => {
    const order = await orderModel
      .findById(req.params.id)
      if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save();
        res.json(updatedOrder)
      }else{
        res.status(401)
        throw new Error("Order not found")
      }
  });
}




