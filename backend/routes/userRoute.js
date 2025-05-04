import express from "express";
import {handleUserRegister,handleUserLogin,handleAdminLogin} from "../controllers/userController.js";
const userRouter=express.Router();


userRouter.post("/register",handleUserRegister);
userRouter.post("/login",handleUserLogin);
userRouter.post("/admin",handleAdminLogin);


export default userRouter;
