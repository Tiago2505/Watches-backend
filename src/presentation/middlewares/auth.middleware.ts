import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config";

export class AuthMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header("Authorization");

    if (!authorization) return res.status(401).json("No token provided");

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json("Invalid bearer token");

    const token = authorization.split(" ")[1] || "";

    const payload = await JwtAdapter.validateToken(token);

    if (!payload) return res.status(401).json("invalid token");

    next();
  };
}
