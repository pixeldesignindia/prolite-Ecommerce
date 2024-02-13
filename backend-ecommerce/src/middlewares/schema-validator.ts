import { Request, Response,NextFunction } from "express";
import { z, ZodError } from "zod";

export const validatation= (schema: z.ZodType) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      ...req.body,
      photos:(req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => file.path) // Assuming req.files contains the uploaded files
    };
    const parseBody = await schema.parseAsync(data);
  req.body = parseBody;
    next();
  } catch (err) {
    const statusCode= 400;
    console.error(err);
    const message = (err as ZodError).issues[0].message;

    const error = {  message,statusCode};
    next(error)
  }
};
