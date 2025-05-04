import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import connectCludinary from "./config/cloudinary.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();
const port=process.env.PORT||4000;




// middlewares
app.use(express.json());
app.use(cors());
connectDB();
connectCludinary();




app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use("/api/order",orderRouter);





// API endpoints;

app.get('/',(req,res)=>{
    res.send(`API successfully connected`)
});

app.listen(port,()=>{
    console.log("Server is running on Port : "+port);

})