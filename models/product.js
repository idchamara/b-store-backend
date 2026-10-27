import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        productName: {
            type: String,
            required: true
        },
        altNames: {
            type: [String],
            default: []
        },
        price: {
            type: Number,
            required: true
        },
        labeledPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true,
            default: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"]
        },
        stock: {
            type: Number,
            required: true
        }
    }
);

const Product = mongoose.model("products", productSchema);
export default Product;