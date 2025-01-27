import prisma from '../prismaClient';
import { Url } from '@prisma/client';


const existingUrl = async (originalUrl: string, userId: number) => {
  const url = await prisma.url.findFirst({
    where: {
      originalUrl,
      userId
    }
  })

  return url
}

export const createUrl = async (userId: number, originalUrl: string, slug: string): Promise<Url | { message: string }> => {

  const existing = await existingUrl(originalUrl, userId)

  if (existing) {
    return { message: "Url already exists" }
  }

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

