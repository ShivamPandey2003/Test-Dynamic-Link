import { NextFunction, Request, Response } from "express";
import { fileUpload } from "../models/file.model";

export const UploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file)
      return res.status(404).json({
        message: "File not found",
      });

    const { filename, destination, mimetype } = req.file;

    const fileFullPath = destination + filename;

    let uploadFile = await fileUpload.findOne({ fileFullPath });

    if (uploadFile) {
      return res.status(400).json({ message: "file already exist" });
    }

    uploadFile = new fileUpload({
      filename: filename,
      mimeType: mimetype,
      path: fileFullPath,
    });
    await uploadFile.save();
    return res.json({ status: 200, success: "file uploaded successfully" });
  } catch (err: any) {
    return next(
      res.status(500).json({
        error: err.message,
      })
    );
  }
};

export const DynamicLick = async (req: Request, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(404).send("Link not found");
  }
  const userAgent = req.headers["user-agent"] || "";

  const storeUrl = /android/i.test(userAgent)
    ? "https://play.google.com/store/apps/details?id=com.myapp"
    : "https://apps.apple.com/app/id123456789";

  const encodedUrl = encodeURIComponent(`${url}`);

  const deepLink = `surveypoc://Survey?url=${encodedUrl}`

  return res.status(200).send(`
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Redirecting...</title>
        <script>
          setTimeout(() => { window.location.href = '${storeUrl}'; }, 1500);
          window.location.href = '${deepLink}';
        </script>
      </head>
      <body>Redirecting...</body>
    </html>
  `);;
};
