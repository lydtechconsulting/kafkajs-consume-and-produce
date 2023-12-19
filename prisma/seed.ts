import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {

  await prisma.version.create({
      data: {
          version: 'v1',
      },
  })
};