import express from "express";
const app = express.Router();
// import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupon, paymentIntent } from "../controllers/payments.js";

app.post('/create',paymentIntent)
app.post("/new/coupon",newCoupon)
app.get("/discount",applyDiscount)
app.get("/Coupons/all",allCoupons)
app.delete("/coupon/:id",deleteCoupon)


export default app;