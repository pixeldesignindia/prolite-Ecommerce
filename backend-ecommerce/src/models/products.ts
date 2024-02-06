import mongoose from "mongoose";


const schema =  new mongoose.Schema({
    name:{
        type:"String",
        required:[true,"Name is required"]
    },
    discription:{
        type:"String",
        required:[true,"Description is required"]
    },
    category:{
        type:"String",
        required:[true,"Category is required"]
    },
    price:{
        type:"Number",
        required:[true,"Price is required"]
    },
    stock:{
        type:"Number",
        required:[true,"Stock is required"]
    },
    photo:{
        type:"String",
        required:[true,"Photo is required"]
    }
},{timestamps:true});


export const Product = mongoose.model("Product",schema)