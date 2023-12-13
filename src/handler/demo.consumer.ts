import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from 'kafkajs';

export class DemoConsumer {
    private readonly consumer: Consumer;
  
    constructor(kafkaConfig: KafkaConfig) {
        const kafka = new Kafka(kafkaConfig);
        this.consumer = kafka.consumer({ groupId: 'demo-group' });
    }
  
    async listen(): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'inbound-topic' })
        await this.consumer.run({ eachMessage: payload => this.handle(payload) })
    }

    async disconnect(): Promise<void> {
		await this.consumer.disconnect();
	}

    async handle(payload: EachMessagePayload) {
        return console.log({
            value: payload
        })
    }
}
