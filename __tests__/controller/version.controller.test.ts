import { VersionController } from "../../src/controllers/version.controller";
import { VersionService } from "../../src/service/version.service";
import { Request } from 'express';

describe('VersionController', () => {
    let versionController: VersionController;
    let versionService: VersionService;
  
    let mockRequest: Request;
    let mockResponse: any;
  
    beforeEach(() => {
        versionService = new VersionService();
        versionController = new VersionController(versionService);
        mockRequest = { params: {} } as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    describe('getVersion', () => {
        it('should return 200 with the version', async () => {
            const versionServiceGetVersionSpy = jest.spyOn(versionService, "getVersion").mockImplementation(async () => 'v1');
            versionController = new VersionController(versionService);

            await versionController.getVersion(mockRequest, mockResponse);

            expect(versionServiceGetVersionSpy).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith('v1');
        });
    });
});