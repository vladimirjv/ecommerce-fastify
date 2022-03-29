import { env } from "process";
import jwt from "jsonwebtoken";

const accessTokenSecret = env["ACCESS_TOKEN_SECRET"] as string;

export const signAccessToken = (payload: any) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token as string);
    });
  });
};

export const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload: unknown) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(message);
      }
      resolve(payload);
    });
  });
};
