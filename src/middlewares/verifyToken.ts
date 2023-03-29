/** @format */

import { NextFunction, Request, Response } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import "dotenv/config";

const verify = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY as "", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      // @ts-ignore
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export default verify;
