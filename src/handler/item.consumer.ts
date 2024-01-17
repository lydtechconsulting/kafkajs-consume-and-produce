import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from 'kafkajs'
import { ItemService } from '../service/item.service';

export class ItemConsumer {
    private readonly itemService: ItemService;
    private readonly consumer: Consumer;
  
    constructor(itemService: ItemService, kafkaConfig: KafkaConfig) {
        this.itemService = itemService
        const kafka = new Kafka(kafkaConfig)
        this.consumer = kafka.consumer({ groupId: 'demo-group' })
    }
  
    async listen(): Promise<void> {
        try {
            await this.consumer.connect()
            await this.consumer.subscribe({ topic: 'create-item', fromBeginning: true })
            await this.consumer.run({ eachMessage: payload => this.handle(payload) })
        } catch(e) {
            console.error(e)
        }
    }

    async disconnect(): Promise<void> {
        try {
	    	await this.consumer.disconnect()
        } catch(e) {
            console.error(e)
        }
    }

    async handle(payload: EachMessagePayload) {
        console.log(`Received message: ${payload}`)
        const parsedMessage = JSON.parse(payload.message.value?.toString() || '{}')
        this.itemService.createItem(parsedMessage.name)
    }
}
