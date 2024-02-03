import mongoose from "mongoose";


const schema  = new mongoose.Schema({
    user:{
        type: 'String',
        required:[true,"user id must be provided"]
    },
    name:{
      type: 'String',
      required: true
    },
    phoneNumber:{
      type: Number,
      required: true
    },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: [true,"city id must be provided"]
      },
      state: {
        type: String,
        required: [true,"state id must be provided"]
      },
      country: {
        type: String,
        required: [true,"country id must be"]
      },
      pinCode: {
        type: Number,
        required: [true,"pin code must be provided"]
      },
      isDeleted:{
        type: Boolean,
        default: false
      }
},{timestamps:true})

export const Address =  mongoose.model('Address',schema);