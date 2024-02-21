import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {  newAdressRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Address } from "../models/address.js";
import { invalidateCache } from "../utils/features.js";
import { myCache } from "../app.js";

export const getAllAdressByUser =TryCatch(async(req,res,next)=>{
    const {id: user} = req.params
    const key = `my-address-${user}`;
        let getAllAdress=[];
  
    if(!user) return next(new ErrorHandler("please provide  userId in the params ", 400));
  if (myCache.has(key))
    getAllAdress = JSON.parse(myCache.get(key) as string);
else{
  getAllAdress  =  await Address.find({user:user,isDeleted:false}).sort({createdAt:-1});
    if(getAllAdress.length<1) return next(new ErrorHandler("You have no Address yet", 400));
     myCache.set(key, JSON.stringify(getAllAdress));
}
      return res.status(200).json({
    success: true,
    getAllAdress,
  });

})
export const deleteAdress = TryCatch(async (req, res, next) => {
  const { id } = req.params;


  const address = await Address.findById(id);
  if (!address) return next(new ErrorHandler("address  Not Found", 404));

  await Address.updateOne(
    { _id: id },
    { $set: { isDeleted: true } }
  );

  invalidateCache({
    addressId:String(id),
    shippingAddress:true,
    userId: address.user,
    
  })
  return res.status(200).json({
    success: true,
    message: "Address Deleted Successfully",
  });
});

export const editAddress =  TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const {address,city,state,country,pinCode,name,phoneNumber} = req.body;
  if (!id) return next(new ErrorHandler("address  Not Found", 404))
  const editAddress = await Address.findById(id);
  if (!editAddress) return next(new ErrorHandler("address  Not Found", 404));


  if (address) editAddress.address = address;
  if (state) editAddress.state = state;
  if (city) editAddress.city = city;
  if (pinCode) editAddress.pinCode= pinCode;
  if (country) editAddress.country = country;
   if (name) editAddress.name= name;
  if (phoneNumber) editAddress.phoneNumber = phoneNumber;


  await editAddress.save();
  invalidateCache({
    addressId:String(id),
    shippingAddress:true,
    userId: editAddress.user,
  })
  return res.status(200).json({
    success: true,
    message: "Shipping address edit Successfully",
  });
});

export const newAddress = TryCatch(
  async (req: Request<{}, {}, newAdressRequestBody>, res, next) => {
    const { address,state,city,user,country,pinCode, name,phoneNumber, } = req.body;

    if (!address || !state || !city || !country|| !pinCode || !user || !name || !phoneNumber) {

      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    await Address.create({
        name,
        phoneNumber,
        address,
        state,
        city,
        user,
        country,
        pinCode

    });
   invalidateCache({
    shippingAddress:true,
    userId:user,
    admin: true,
})
    return res.status(201).json({
      success: true,
      message: "shipping Address Created Successfully",
    });
  }
);
