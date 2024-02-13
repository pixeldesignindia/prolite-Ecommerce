import mongoose from "mongoose";
import { string } from "zod";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    brand: {
        type: String,
        required: [true, "brand is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    photos: [
        {
            type: String,
            required: [true, "Photo is required"]
        }
    ],
    productModel:{
        type: String,
        required: [true, "Product model is required"]
    },
    dimensions:{
        type:String,
        required: [true, "Dimension is required"]
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", schema);