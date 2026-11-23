import express from 'express';
import { creatrOrder, getOrders, updateOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", creatrOrder)
orderRouter.get("/", getOrders);
orderRouter.put("/:orderId", updateOrders)

export default orderRouter;