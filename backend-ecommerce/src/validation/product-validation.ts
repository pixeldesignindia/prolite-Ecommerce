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
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .trim()
    .min(1, { message: "Category is required" }),

  brand: z
    .string({
      required_error: 'Product brand is required',
      invalid_type_error: 'Product brand must be a string',
    })
    .trim()
    .min(1, { message: "Brand is required" })
    .toUpperCase(),

  price: z
  .string({
      required_error: 'Product Price is required',
      invalid_type_error: "Price should be a string",
    })
    .min(0, { message: "Price should be greater than or equal to 0" })
    .transform((val) => parseFloat(val)),
    

  stock: z
    .string({
      required_error: 'Product stock is required',
      invalid_type_error: "stock should be a string",
    })
    .min(0, { message: "Price should be greater than or equal to 0" })
    .transform((val) => parseFloat(val)),

  photos: z.array(z.string()).min(1, "At least one photo is required").optional(),

  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .trim()
    .min(1, { message: "Description is required" }),
    prodoctModel: z
    .string({
      required_error:"product Model is required",
      invalid_type_error:"product Model must be string"
    })
    .trim()
    .min(1,{message:"product model atleast one character"})
    .max(255,{message:"product model must not be more than 255 characters"}),
    dimensions:z
    .string({
      required_error:"dimensions must be required",
      invalid_type_error:"dimensions must be string"
    })
    .trim()
    .min(1,{message:"product model atleast one character"})
    .max(255,{message:"product model must not be more than 255 characters"}),
});
