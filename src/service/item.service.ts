import { PrismaClient } from '@prisma/client';

export class ItemService {

    async getItem(): Promise<String|undefined> {
        const prismaClient = await this.getPrismaClient()
        const result = await prismaClient.version.findFirst()
        return result?.version
    }

    async getPrismaClient(): Promise<PrismaClient> {
        return new PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        })
    }
}