import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Connected to the databace.");
    }
).catch(
    ()=>{
        console.log("Connection failed.");
    }
);

app.use(bodyParser.json());
app.use(verifyJWT);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);


app.listen(3000, 
    ()=>{
        console.log("Server is running on port 3000")
    }
)

// start from day 8