import { Unauthorized } from 'http-errors';
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

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
export const verifyAccessTokenDecorador = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!request.headers.authorization)  throw new Unauthorized()
    await verifyAccessToken(request.headers.authorization as string);
  } catch (error) {
    if (error === "Unauthorized") {
      throw new Unauthorized();
    }
    throw error;
  }
};
