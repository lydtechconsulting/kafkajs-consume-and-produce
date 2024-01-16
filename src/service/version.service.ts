import prisma from '../db/prisma.client'

export class VersionService {

    async getVersion(): Promise<String|undefined> {
        const result = await prisma.version.findFirst()
        return result?.version
    }
}