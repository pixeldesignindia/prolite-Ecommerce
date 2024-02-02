import express from "express";
const app = express.Router();
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupon, paymentIntent } from "../controllers/payments.js";

app.post('/create',paymentIntent)
app.post("/new/coupon",adminOnly,newCoupon)
app.get("/discount",applyDiscount)
app.get("/Coupons/all",adminOnly,allCoupons)
app.delete("/coupon/:id",adminOnly,deleteCoupon)


export default app;