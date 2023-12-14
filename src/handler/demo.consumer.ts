import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from 'kafkajs';

export class DemoConsumer {
    private readonly consumer: Consumer;
  
    constructor(kafkaConfig: KafkaConfig) {
        const kafka = new Kafka(kafkaConfig);
        this.consumer = kafka.consumer({ groupId: 'demo-group' });
    }
  
    async listen(): Promise<void> {
        try {
            await this.consumer.connect()
            await this.consumer.subscribe({ topic: 'inbound-topic', fromBeginning: true })
            await this.consumer.run({ eachMessage: payload => this.handle(payload) })
        } catch(e) {
            console.error(e)
        }
    }

    async disconnect(): Promise<void> {
        try {
	    	await this.consumer.disconnect();
        } catch(e) {
            console.error(e)
        }
    }

    async handle(payload: EachMessagePayload) {
        console.log({value: payload})
    }
}
