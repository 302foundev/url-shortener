import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ error: 'Token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  }

  catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

};

