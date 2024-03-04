import express from "express";


const app = express.Router();

import {
    deleteUser,
    getAllUsers,
  getUser,
  login,
  newUser,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { validatation } from "../middlewares/schema-validator.js";
import { userSchema } from "../validation/user-validation.js";


app.post("/new",validatation(userSchema),newUser)
app.post("/login",login)
app.get("/all",adminOnly,getAllUsers)

app.route("/:id").get(getUser).delete(adminOnly,deleteUser)

app.post("/forgetPassword",sendOtp)
app.post("/verifyOtp",verifyOtp)
app.post("/resetPassword",resetPassword)

export default app;