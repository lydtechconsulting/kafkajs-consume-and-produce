import prisma from "../../src/db/prisma.client";
import { VersionService } from "../../src/service/version.service";

jest.mock('../../src/db/prisma.client', () => ({
    version: {
        findFirst: jest.fn(),
    },
}));

describe('VersionService', () => {
    let versionService: VersionService;

    beforeEach(() => {
        versionService = new VersionService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get version from Prisma', async () => {
        const mockVersion = {id: 1, version: 'v1'};
        (prisma.version.findFirst as jest.Mock).mockResolvedValue(mockVersion);

        const result = await versionService.getVersion();

        expect(prisma.version.findFirst).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockVersion.version);
    });

    it('should return undefined if Prisma result is null', async () => {
        (prisma.version.findFirst as jest.Mock).mockResolvedValue(null);

        const result = await versionService.getVersion();

        expect(prisma.version.findFirst).toHaveBeenCalledTimes(1);
        expect(result).toBeUndefined();
    });
});