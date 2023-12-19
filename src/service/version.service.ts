import { PrismaClient } from '@prisma/client';

export class VersionService {

    async getVersion(): Promise<String|undefined> {
        const prismaClient = await this.getPrismaClient()
        const result = await prismaClient.version.findFirst()
        return result?.version
    }

    async getPrismaClient(): Promise<PrismaClient> {
        const globalAny: any = global;
	    const postgresUrl = await globalAny.__POSTGRES_URL__
        return new PrismaClient({
            datasourceUrl: `postgresql://user:password@${postgresUrl}/db?schema=demo`
        })
    }
}