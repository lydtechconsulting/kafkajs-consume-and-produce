import { Message } from "kafkajs";
import KafkaService from "./kafka.service"

export class DemoService {

    constructor(readonly kafkaService: KafkaService) {}

    async process(payload: Buffer | null) {
        const eventMessage: Message = {
			value: JSON.stringify(`Outbound event: ${payload}`)
		};

		this.kafkaService.sendEvent('outbound-topic', eventMessage);
    }
}