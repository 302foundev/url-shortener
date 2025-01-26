import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = (decoded as jwt.JwtPayload).userId;
  next();
};

