import mongoose, { Schema } from "mongoose";
import { FileDoc } from "../utils/all.interface";

const uploadSchema = new Schema(
  {
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

const fileUpload = mongoose.model<FileDoc>("files", uploadSchema);

export { fileUpload };