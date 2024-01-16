import { ItemController } from "../../src/controllers/item.controller";
import { ItemService } from "../../src/service/item.service";
import { Request } from 'express';

describe('ItemController', () => {
    let itemController: ItemController;
    let itemService: ItemService;
  
    let mockRequest: Request;
    let mockResponse: any;
  
    beforeEach(() => {
        itemService = new ItemService();
        itemController = new ItemController(itemService);
        mockRequest = { params: {}, body: {} } as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            location: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    describe('getItem', () => {
        it('should return 200 if item is found', async () => {
            const mockItem = { id: 1, name: 'test-item' };
            mockRequest.params.itemId = '1';
            const itemServiceGetItemSpy = jest.spyOn(itemService, "getItem").mockImplementation(async () => mockItem);

            await itemController.getItem(mockRequest, mockResponse);
        
            expect(itemServiceGetItemSpy).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockItem);
        });

        it('should return 400 if itemId is not set', async () => {
            await itemController.getItem(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('should return 404 if item is not found', async () => {
            mockRequest.params.itemId = '1';
            const itemServiceGetItemSpy = jest.spyOn(itemService, "getItem").mockImplementation(async () => null);

            await itemController.getItem(mockRequest, mockResponse);

            expect(itemServiceGetItemSpy).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });

    describe('createItem', () => {
        it('should create item and return 201 with location header', async () => {
            mockRequest.body = {
                name: 'test-item',
            };
            const mockItem = { id: 1, name: 'test-item' };
            const itemServiceCreateItemSpy = jest.spyOn(itemService, "createItem").mockImplementation(async () => mockItem);

            await itemController.createItem(mockRequest, mockResponse);

            expect(itemServiceCreateItemSpy).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.location).toHaveBeenCalledWith('1');
        });

        it('should return 400 if item name is not set', async () => {
            const itemServiceCreateItemSpy = jest.spyOn(itemService, "createItem");

            await itemController.createItem(mockRequest, mockResponse);

            expect(itemServiceCreateItemSpy).not.toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
});