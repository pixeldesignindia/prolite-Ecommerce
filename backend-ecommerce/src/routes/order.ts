import express from "express";
import { allOrders, deleteOrder, myOrders, newOroduct, processOrder, singleOrder } from "../controllers/order.js";
import { adminOnly } from "../middlewares/auth.js";
import { validatation } from "../middlewares/schema-validator.js";
import { orderSchema } from "../validation/order-validation.js";

const app = express.Router();

app.post("/new",validatation(orderSchema),newOroduct);

app.get("/my/:id", myOrders);

app.get("/all", adminOnly, allOrders);

app
  .route("/:id")
  .get(singleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default app;