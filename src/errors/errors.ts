import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { MulterError } from "multer";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleErros = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (
    error instanceof MongoServerError ||
    error instanceof TypeError ||
    error instanceof mongoose.Error.CastError
  ) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(409).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof MulterError) {
    return res.status(413).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
};

export { AppError, handleErros };
