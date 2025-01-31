import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const jwtSecret = process.env.JWT_SECRET!;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret!) as JwtPayload;

    if (typeof decoded === "object" && "id" in decoded) {
      req.user = { id: decoded.id as string }
      return next()
    }

    res.status(401).json({ error: "Invalid token" })
  }

  catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

