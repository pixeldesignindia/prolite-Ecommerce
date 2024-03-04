import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import {sendEmail} from "../utils/email.js"

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, _id,password } = req.body;

    let user = await User.findById(_id);

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    if (!_id || !name || !email)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email,
      photo,
      password,
      _id,

    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);
export const login = TryCatch(async (req, res, next) => {
  const {email,password } = req.body;
  if(!email || !password)  return next(new ErrorHandler("Please Enter all field", 400));
  const user = await User.findOne({email});
  if(!user) return next(new ErrorHandler("Invalid Email Id", 403));
  if(password!== user.password) return next(new ErrorHandler("Wrong Password", 403));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});


function generateOTP(length:number) {
  const characters = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}
export const sendOtp = TryCatch(async (req, res) => {

const { email } = req.body;

    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ message: 'User with this phone number not found.' });
    }

    const otp = generateOTP(6);
    try {
await sendEmail({
  email:user.email,
  subject: "password reset OTP",
  message:`Your OTP for password reset is: ${otp}`,

})
  const otpToken = jwt.sign({ email:email, otp: otp, purpose: "otp_verify" }, process.env.JWT_TOKEN||'', { expiresIn: 600 })
    res.status(200).json({ message: 'OTP sent successfully. Please check your email',data:otpToken});
    }
    catch(err){
      res.status(400).json({ message: 'OTP not sent successfully. Technical Issue',})
      console.log(err)
    }

})

export const verifyOtp = TryCatch(async(req, res) => {

 
    const { otpToken, otp } = req.body;
 

    if (!otpToken) return res.status(400).json({ status: false, message: "Invalid Otp Token" })

    const data = jwt.verify(otpToken, process.env.JWT_TOKEN || "") as JwtPayload & { purpose: string; otp: string; email: string };

    if (data.purpose != "otp_verify") {
      return res.status(400).json({ status: false, message: "Invalid Otp Token" })
    }

    if (data.otp != otp) {
      return res.status(400).json({ status: false, message: "Invalid Otp" })
    }

    const user = await User.findOne({ email: data.email })

    if (!user) return res.status(400).json({ status: false, message: "Invalid Otp Token" })

    const verifiedToken = jwt.sign({ userId: user._id, purpose: "otp_verified" }, process.env.JWT_TOKEN||'', { expiresIn: 600 })
    res.status(201).json({ status: true, message: "Otp Verified Successfully", data: { verifiedToken } })


})

export const resetPassword = TryCatch(async (req, res) => {

    const { verifiedToken, newPassword } = req.body;


     const data = jwt.verify(verifiedToken, process.env.JWT_TOKEN || '') as JwtPayload & { purpose: string; userId: string };

    if (data.purpose != "otp_verified") {
      return res.status(400).json({ status: false, message: "Invalid Otp Token" })
    }

    const user = await User.findOne({ _id: data.userId });
    if (!user) return res.status(404).json({ status: false, message: "Invalid  verified Otp token" });

  
    user.password = newPassword;

    await user.save()

    res.json({ message: 'Password reset successful.' });
 
})
