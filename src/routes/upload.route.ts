import express from "express";
import { imageUpload } from "../middlewares/Multer.middleware";
import { DynamicLick, UploadFiles } from "../controllers/Upload.controller";

const router = express.Router();

router.post("/uploadfile", imageUpload.single("file"), UploadFiles);
router.get("/dynamic", DynamicLick);

export { router as UploadRouter };