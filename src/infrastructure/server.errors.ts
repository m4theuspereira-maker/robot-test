import { Response } from "express";

export const responseError = (res: Response, error: any): Response => {
  return res.status(200).json({ body: error.message });
};
