import express, { response } from "express";

import { uploader } from "./middlewares/uploader-middleware";
import prisma from "./configs/prisma";
import { generateFileName } from "./utils/generate-file-name";
import { uploadFile, getFileUrl, deleteFile } from "./configs/aws-s3";

const app = express();
const upload = uploader();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to Express - AWS S3 Integration V.1" });
});

app.post("/api/v1/posts", upload.single("image"), async (req, res) => {
  const file = req.file;
  const caption = req.body.caption;
  const imageName = generateFileName();

  await uploadFile(file?.buffer, imageName, file?.mimetype);
  await prisma.post.create({
    data: {
      imageName,
      caption,
    },
  });

  return res.status(201).json({ response: "OK" });
});

app.get("/api/v1/posts", async (req, res) => {
  const posts = await prisma.post.findMany({});
  const postsWithImageUrl = await Promise.all(
    posts.map(async (post) => {
      const imageUrl = await getFileUrl(post.imageName);
      return { ...post, imageUrl };
    })
  );

  return res.status(200).json({ response: "OK", data: postsWithImageUrl });
});

app.delete("/api/v1/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });

  await deleteFile(post?.imageName);
  await prisma.post.delete({ where: { id } });

  return res.status(200).json({ response: "OK" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
