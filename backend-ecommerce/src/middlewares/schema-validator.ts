import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validatation = (schema: z.ZodObject<any, any>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      ...req.body,
    };


    const parseBody = await schema.parseAsync(data);
    req.body = parseBody;
    next();
  } catch (err) {
    const statusCode = 400;
    console.error(err);
    const message = (err instanceof ZodError && err.errors && err.errors[0]) ? err.errors[0].message : 'Validation error';

    const error = { message, statusCode };
    next(error);
  }
};
