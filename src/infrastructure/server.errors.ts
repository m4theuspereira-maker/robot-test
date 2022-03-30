import { Response } from "express";

export const responseError = (res: Response, error: any): Response => {
  return res.status(400).json({ body: error.message });
};
