import prisma from '../prismaClient';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/user.dto';

export const createUser = async (first_name: string, last_name: string, email: string, hashedPassword: string): Promise<CreateUserDto> => {
  const user = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const deleteUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

