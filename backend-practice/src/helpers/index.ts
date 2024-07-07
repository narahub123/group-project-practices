// encrypt the password or create a random token
import crypto from "crypto";

const SECRET = "TRIP-IT-REST-API";

// 랜덤 번호 생성
export const random = () => crypto.randomBytes(128).toString("base64");

// 패스워드 해싱하기
export const hashedPassword = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
