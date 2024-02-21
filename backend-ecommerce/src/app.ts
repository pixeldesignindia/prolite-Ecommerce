import {config} from "dotenv";
import express from "express";
import Stripe from 'stripe'
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import cors from"cors"



config({ path: "./.env" });

const port = process.env.PORT ;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

//importing Routes
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import addressRouter from "./routes/address.js"
import orderRouter from "./routes/order.js"
import paymentRouter from "./routes/payment.js"
import statisticsRouter from "./routes/statistics.js"
import path from "path";
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','https://localhost:3000',],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  }));
app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/address",addressRouter)
app.use("/api/v1/orders",orderRouter)
app.use("/api/v1/payments",paymentRouter)
app.use("/api/v1/statistics",statisticsRouter)

app.use("/uploads", express.static("uploads"));
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, "ui")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ui/index.html"));
});
app.use(errorMiddleware);
app.listen(port, () => {
console.log(`express listening on port ${port}`);
});