import { VersionController } from "../../src/controllers/version.controller";
import { VersionService } from "../../src/service/version.service";
var httpMocks = require('node-mocks-http');

describe('VersionController', () => {
    let controller: VersionController;
  
    it('get version', async () => {
        const versionService = new VersionService()
        const getVersionSpy = jest.spyOn(versionService, "getVersion").mockImplementation(async () => 'v1');
        controller = new VersionController(versionService);

        var mockRequest  = httpMocks.createRequest({
            method: 'GET',
            url: '/version',
        });
        var mockResponse = httpMocks.createResponse();
        const mockResponseStatusSpy = jest.spyOn(mockResponse, 'status');
        
        await controller.getVersion(mockRequest, mockResponse);
        expect(mockResponseStatusSpy).toHaveBeenCalled();
        expect(getVersionSpy).toHaveBeenCalledTimes(1);
    });
});