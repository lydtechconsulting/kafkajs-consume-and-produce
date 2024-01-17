import { ItemController } from "../../src/controllers/item.controller";
import { ItemService } from "../../src/service/item.service";
import { Request } from 'express';

describe('ItemController', () => {
    let itemController: ItemController;
    let mockItemService: jest.Mocked<ItemService>;
  
    let mockRequest: Request;
    let mockResponse: any;
  
    beforeEach(() => {
        mockItemService = {
            getItem: jest.fn(),
            kafkaService: {} as any,
            createItem: jest.fn(),
        };
      
        itemController = new ItemController(mockItemService);
        mockRequest = { params: {}, body: {} } as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            location: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getItem', () => {
        it('should return 200 if item is found', async () => {
            const mockItem = { id: 1, name: 'test-item' };
            mockItemService.getItem.mockResolvedValue(mockItem);
            mockRequest.params.itemId = '1';

            await itemController.getItem(mockRequest, mockResponse);
        
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockItem);
            expect(mockItemService.getItem).toHaveBeenCalledTimes(1);
            expect(mockItemService.getItem).toHaveBeenCalledWith(1);
        });

        it('should return 400 if itemId is not set', async () => {
            await itemController.getItem(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('should return 404 if item is not found', async () => {
            mockRequest.params.itemId = '1';
            mockItemService.getItem.mockResolvedValue(null);

            await itemController.getItem(mockRequest, mockResponse);

            expect(mockItemService.getItem).toHaveBeenCalledTimes(1);
            expect(mockItemService.getItem).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });

    describe('createItem', () => {
        it('should create item and return 201 with location header', async () => {
            mockRequest.body = {
                name: 'test-item',
            };
            const mockItem = { id: 1, name: 'test-item' };
            mockItemService.createItem.mockResolvedValue(mockItem);

            await itemController.createItem(mockRequest, mockResponse);

            expect(mockItemService.createItem).toHaveBeenCalledTimes(1);
            expect(mockItemService.createItem).toHaveBeenCalledWith('test-item');
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.location).toHaveBeenCalledWith('1');
        });

        it('should return 400 if item name is not set', async () => {
            await itemController.createItem(mockRequest, mockResponse);

            expect(mockItemService.createItem).not.toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
});