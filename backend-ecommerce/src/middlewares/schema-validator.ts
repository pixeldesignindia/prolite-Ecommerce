import { Request, Response,NextFunction } from "express";
import { z, ZodError } from "zod";

export const validatation= (schema: z.ZodType) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const statusCode= 400;
    const message = (err as ZodError).issues[0].message;

    const error = {  message,statusCode};
    next(error)
  }
};
