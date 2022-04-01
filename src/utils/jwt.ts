import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"] as string;

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

export const authenticateDecorator = async (request: FastifyRequest, reply: FastifyReply)  => { 
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.unauthorized(error as string);
  }
}
