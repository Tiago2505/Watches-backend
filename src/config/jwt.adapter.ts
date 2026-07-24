import jwt from "jsonwebtoken";

import { envs } from "./envs.adapter";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export class JwtAdapter {
  static generateToken(
    payload: any,
    duration: jwt.SignOptions["expiresIn"] = "24h",
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);

        return resolve(token!);
      });
    });
  }

  static validateToken(token: string): Promise<JwtPayload | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);

        resolve(decoded as JwtPayload);
      });
    });
  }
}
