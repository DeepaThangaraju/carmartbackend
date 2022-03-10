import express from "express";
const router = express.Router();

import {
  addOrder,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered
} from "../controllers/orderControllers.js";
import { admin, authenticate } from "../middleware/authMiddleware.js";

router.route("/").post(authenticate,addOrder()).get(authenticate,admin,getOrders());
router.route("/myorders").get(authenticate,getMyOrders());
router.route("/:id").get(authenticate,getOrderById());
router.route("/:id/pay").put(authenticate,updateOrderToPaid());
router.route("/:id/deliver").put(authenticate,admin,updateOrderToDelivered());


export const orderRoute = router;
