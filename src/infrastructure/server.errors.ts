import { Response } from "express";

export const serverError = (res: Response, error: any): Response => {
  return res.status(500).json({ body: error.message });
};
