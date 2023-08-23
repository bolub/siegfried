import { env } from "@/env.mjs";
import { type TokenServiceType } from "@/server/modules/token-service/interface";
import jwt from "jsonwebtoken";

const generateToken: TokenServiceType["generateToken"] = (data) => {
  return jwt.sign(data, env.JWT_SECRET, {
    expiresIn: "48h",
  });
};

const verifyToken: TokenServiceType["verifyToken"] = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const TokenService: TokenServiceType = {
  generateToken,
  verifyToken,
};
