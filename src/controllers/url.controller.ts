import prisma from '../prisma/prismaClient';
import { Url } from '@prisma/client';

export const createUrl = async (userId: number, originalUrl: string, slug: string): Promise<Url> => {
  const url = await prisma.url.create({
    data: {
      userId,
      originalUrl,
      slug,
    },
  });
  return url;
};

export const findUrlBySlug = async (slug: string): Promise<Url | null> => {
  const url = await prisma.url.findUnique({
    where: {
      slug,
    },
  });
  return url;
};

