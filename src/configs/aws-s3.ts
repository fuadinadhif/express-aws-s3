import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Buffer } from "buffer";
import dotenv from "dotenv";

dotenv.config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;
const REGION = process.env.AWS_S3_BUCKET_REGION as string;
const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export function uploadFile(
  fileBuffer: Buffer | undefined,
  fileName: string,
  mimetype: string | undefined
) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export async function getFileUrl(key: string) {
  const getParams = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(getParams);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return url;
}

export function deleteFile(fileName: string | undefined) {
  const deleteParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}
