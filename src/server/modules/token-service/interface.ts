import { type JwtPayload } from "jsonwebtoken";

export interface TokenServiceType {
  generateToken: (data: JwtPayload) => string;
  verifyToken: (token: string) => string | JwtPayload;
}
