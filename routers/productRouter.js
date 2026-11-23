import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById)
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);


export default productRouter;