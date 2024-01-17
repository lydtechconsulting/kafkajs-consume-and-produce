import { Item } from '@prisma/client';
import prisma from '../../src/db/prisma.client';
import { ItemService } from '../../src/service/item.service';
import KafkaService from '../../src/service/kafka.service';

jest.mock('../../src/db/prisma.client', () => ({
    item: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));


describe('ItemService', () => {
    let itemService: ItemService;
    let mockKafkaService: jest.Mocked<KafkaService>;

    beforeEach(() => {
        mockKafkaService = {
            producer: {} as any,
            sendEvent: jest.fn(),
        } as any;

        itemService = new ItemService(mockKafkaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Get item', () => {
        it('should get an item by id', async () => {
            const mockItem: Item = { id: 1, name: 'test-item' };

            (prisma.item.findUnique as jest.Mock).mockResolvedValue(mockItem);

            const result = await itemService.getItem(1);

            expect(prisma.item.findUnique).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockItem);
        });

        it('should return null if item is not found by id', async () => {
            (prisma.item.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await itemService.getItem(1);

            expect(prisma.item.findUnique).toHaveBeenCalledTimes(1);
            expect(result).toBeNull();
        });
    });


    describe('Create item', () => {
        it('should create an item successfully', async () => {
            const mockItem: Item = { id: 1, name: 'Test Item' };

            // Mock the prisma.item.create function
            (prisma.item.create as jest.Mock).mockResolvedValue(mockItem);

            // Call the createItem method
            const result = await itemService.createItem('Test Item');

            // Assertions
            expect(prisma.item.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockItem);
        });
    });
});
