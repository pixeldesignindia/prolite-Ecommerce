import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";


export const adminOnly = TryCatch(async (req,res,next) => {
    const{id} = req.query;

    if(!id) return next(new ErrorHandler("Please login",401))
    const admin = await User.findById(id);
    if(!admin) return next(new ErrorHandler("invalid login",401))
    if(admin.role !=="admin") return next(new ErrorHandler("you are not allowed",401))
    next()
})