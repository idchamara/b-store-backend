import express from 'express';
import { creatrOrder, getOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", creatrOrder)
orderRouter.get("/", getOrders);

export default orderRouter;