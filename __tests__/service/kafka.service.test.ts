import { Kafka, KafkaConfig, Message, Producer } from 'kafkajs';
import KafkaService from '../../src/service/kafka.service';

jest.mock('kafkajs');

describe('KafkaService', () => {
    let kafkaService: KafkaService;
    let mockProducer: jest.Mocked<Producer>;

    beforeEach(() => {
        mockProducer = {
            connect: jest.fn(),
            send: jest.fn(),
            disconnect: jest.fn(),
        } as any;
        const mockKafkaConfig: KafkaConfig = { clientId: 'test-client-id', brokers: ['localhost:9092'] };
        (Kafka as jest.Mock).mockImplementation(() => ({
            producer: jest.fn(() => mockProducer),
        }));        
        kafkaService = new KafkaService(mockKafkaConfig);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send event to Kafka topic', async () => {
        const mockEvent: Message = { value: 'test-message' };
        const mockTopic = 'test-topic';

        await kafkaService.sendEvent(mockTopic, mockEvent);

        expect(mockProducer.connect).toHaveBeenCalledTimes(1);
        expect(mockProducer.send).toHaveBeenCalledWith({
            topic: mockTopic,
            messages: [mockEvent],
        });
        expect(mockProducer.disconnect).toHaveBeenCalledTimes(1);
    });

    it('should handle errors during event sending', async () => {
        const mockEvent: Message = { value: 'test-message' };
        const mockTopic = 'test-topic';
        const mockError = new Error('Test error');

        mockProducer.send.mockRejectedValueOnce(mockError);

        await expect(kafkaService.sendEvent(mockTopic, mockEvent)).rejects.toThrow(mockError);

        expect(mockProducer.connect).toHaveBeenCalledTimes(1);
        expect(mockProducer.send).toHaveBeenCalledWith({
            topic: mockTopic,
            messages: [mockEvent],
        });
        expect(mockProducer.disconnect).toHaveBeenCalledTimes(1);
    });
});
