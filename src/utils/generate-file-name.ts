import crypto from "crypto";

export function generateFileName(bytes = 32) {
  return `img-${crypto
    .randomBytes(bytes)
    .toString("hex")}-${new Date().getTime()}`;
}
