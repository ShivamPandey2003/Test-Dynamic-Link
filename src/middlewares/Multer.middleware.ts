// src/middlewares/upload.ts
import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const uploadPathRoot = "rootFolder";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = path.join(uploadPathRoot);
    fs.mkdirSync(fullPath, { recursive: true });
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter(req, file, cb) {
    cb(null, true);
  },
});

export { imageUpload };
