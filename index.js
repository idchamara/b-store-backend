import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routers/orderRouter.js';

// db link - mongodb+srv://<db_username>:<db_password>@cluster0.ogz7p0p.mongodb.net/?appName=Cluster0
// db user - bstoreadmin
// db password - nCPsKfXlbKmkbvT9

const app = express();

mongoose.connect("mongodb+srv://bstoreadmin:nCPsKfXlbKmkbvT9@cluster0.ogz7p0p.mongodb.net/?appName=Cluster0").then(
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