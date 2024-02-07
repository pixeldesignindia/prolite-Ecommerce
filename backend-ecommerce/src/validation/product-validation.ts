import { z } from "zod";

export const productSchema = z.object({
  name: z
  .string({
      required_error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string',
    })
    .trim()
    .min(3, { message: 'Product Name is at least 3 characters' })
    .max(255, { message: 'Product Name must not be more than 255 characters' }),

  category: z
    .string({
      required_error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string',
    })
    .trim()
    .min(1, { message: "Category is required" }),
    
  brand: z
    .string({
      required_error: 'Product brand is required',
      invalid_type_error: 'Product brand must be a string',
    })
    .trim()
    .min(1, { message: "Category is required" })
    .toUpperCase(),

  price: z
  .number({
    required_error: 'Product Price is required',
    invalid_type_error: "price should be number",
})
  .min(0, { message: "Price is required" }),

  stock: z
  .number({
    required_error: 'Product Stock is required',
    invalid_type_error: "stock should be number"})
  .min(0, { message: "Stock is required" }),

  photos: z.array(z.string()).min(1, "At least one photo is required"),
   discription: z
    .string({
      required_error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string',
    })
    .trim()
    .min(1, { message: "Discription is required" }),
});
