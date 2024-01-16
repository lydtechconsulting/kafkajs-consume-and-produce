import { PrismaClient } from '@prisma/client';

export default async function seed() {
    const prisma = new PrismaClient({
        datasources: {
              db: {
                url: process.env.DATABASE_URL,
              },
        },
    });
    
    try {
        await prisma.version.create({
            data: {
                version: 'v1',
            },
        })
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
  }
  
  // Ensure not run automatically when imported by a test.
  if (require.main === module) {
    seed()
        .then(() => {
            console.log('The seed command has been executed.');
        })
        .catch((error) => {
            console.error('Error during seed execution:', error);
        });
  }
