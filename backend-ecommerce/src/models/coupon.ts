import mongoose from "mongoose";

const schema =  new mongoose.Schema({
    code:{
        type:String,
        required:[true,"coupon code is required"]
    },
    amount:{
        type:Number,
        required:[true,"amount is required"]
    }
},{timestamps:true})

export const Coupon =mongoose.model("Coupon",schema)