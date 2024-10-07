import multer from "multer";

export function uploader() {
  const storage = multer.memoryStorage();
  return multer({ storage: storage });
}
