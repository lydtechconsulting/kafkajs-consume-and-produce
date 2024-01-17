import { Producer, KafkaConfig, Kafka, Message } from "kafkajs"

export default class KafkaService {
	private readonly producer: Producer

	constructor(kafkaConfig: KafkaConfig) {
        const kafka = new Kafka(kafkaConfig)
		this.producer = kafka.producer()
	}

	async sendEvent(topic: string, event: Message) {
		try {
			await this.producer.connect()
			await this.producer.send({
				topic: topic,
				messages: [event]
			});
			console.log(`Sent event to topic: ${topic}`)
		} catch (err) {
			console.error(`Error sending event to topic: ${topic} Error: ${err}`)
			throw err
		} finally {
			await this.producer.disconnect()
		}
	}
}