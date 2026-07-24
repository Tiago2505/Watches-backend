import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config";

export class RoleMiddleware {
  static validateRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header("Authorization");

    if (!authorization) return res.status(401).json("No token provided");

    const token = authorization.split(" ")[1] || "";

    const payload = await JwtAdapter.validateToken(token);



    if(payload!.role !== 'admin') return res.status(401).json('You do not have sufficient permissions to perform this action.');

    next();
  };
}
