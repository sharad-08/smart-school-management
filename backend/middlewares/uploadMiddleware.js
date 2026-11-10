import multer from "multer";

export default multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
      return callback(Object.assign(new Error("Unsupported image format"), { status: 400 }));
    }
    callback(null, true);
  },
});
