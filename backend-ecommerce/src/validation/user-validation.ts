import * as z from 'zod';

export const userSchema = z.object({
 _id: z.string(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .min(3, { message: 'Name is at least 3 characters' })
    .max(255, { message: 'Name must not be more than 255 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email' })
    .min(3, { message: 'Email must be at least 3 characters' })
    .max(255, { message: 'Email must not be more than 255 characters' }),
  photo: z
  .string({ required_error: 'Photo is required' })
  .url({message:"invalidimage url"}), 
  // gender: z
  // .enum(['male', 'female'],{required_error:"gender must be required"}),
  // dob: z
  // .string({ required_error: 'Date of birth is required' }),
  password: z
  .string({ required_error: 'password is required' })
  .min(3, { message: 'password must be at least 3 characters' })
  .max(255, { message: 'Password must not be more than 255 characters' }),
});
