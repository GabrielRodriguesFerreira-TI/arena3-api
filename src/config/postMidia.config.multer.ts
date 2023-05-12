import { Request } from "express";
import { AppError } from "../errors/errors";

export default {
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: Function
  ) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/x-msvideo",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError("Only videos and images are allowed!"), false);
    }
  },
  limits: {
    fileSize: 25 * 1024 * 1024, // 25mb em bytes
  },
};
