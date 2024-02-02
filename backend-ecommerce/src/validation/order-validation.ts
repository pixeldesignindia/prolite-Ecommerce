import { z } from "zod";
import { Types } from "mongoose";


const isObjectId = (value: string): boolean => {
  return Types.ObjectId.isValid(value);
};
const orderItemSchema = z.object({
  name: z.string().min(1),
  photo: z.string().min(1),
  price: z.number({
    required_error: 'price is required',
    invalid_type_error: "price should be number"}),
  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: "quantity should be number"}),
  productId: z.string().refine(isObjectId, {
    message: "productId must be a valid Mongoose ObjectId",
  }),
});

export const orderSchema = z.object({
  shippingInfo: z
  .string()
  .refine(isObjectId, {
    message: "ShippingInfo must be a valid Mongoose ObjectId",
  }),
 user: z.string(),
  subtotal: z.number({
    required_error: 'subtotal is required',
    invalid_type_error: "subtotal should be number"}),
  tax: z.number({
    required_error: 'tax is required',
    invalid_type_error: "tax should be number"}),
  shippingCharges: z.number({
    invalid_type_error: "sippingCharges should be number"}),
  discount: z.number({
    invalid_type_error: "discount should be number"}),
  total: z.number({
    required_error: 'total is required',
    invalid_type_error: "total should be number"}),
  status: z.enum(["Processing", "Shipped", "Delivered"]).default("Processing"),
  paymentMethod: z.enum(["CASH", "CARD"]).default("CASH"),
  orderItems: z.array(orderItemSchema),
});
