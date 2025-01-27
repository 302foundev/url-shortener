import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (token: string) => {

  try {
    return jwt.verify(token, secret);
  }

  catch {
    return null;
  }
};

