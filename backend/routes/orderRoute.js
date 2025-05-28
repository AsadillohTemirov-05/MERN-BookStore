
import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { allOrders, placeOrder, placeOrderStripe, UpdateStatus, userOrders, verifyStripe } from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";


const orderRouter=express.Router();

orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post("/status",adminAuth,UpdateStatus);


// For PAyment;

orderRouter.post("/place",authUser,placeOrder);
orderRouter.post("/stripe",authUser,placeOrderStripe);


// Verify Payment;

orderRouter.post("/verifyStripe",authUser,verifyStripe);

orderRouter.post("/userorders",authUser,userOrders);


export default orderRouter;
