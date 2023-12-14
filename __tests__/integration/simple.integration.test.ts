import { ITopicConfig, Kafka } from "kafkajs";
import { App } from "../../src/app";

describe("integration", () => {

    let app: App

	beforeAll(async () => {
        
	});

	afterAll(async () => {
		
	});

    test("end to end test", async () => {

        const globalAny: any = global;
		const globalBrokerUrl = globalAny.__KAFKA_BROKERS__;
        const kafka = new Kafka({
            clientId: 'test-producer',
            brokers: globalBrokerUrl,
        })    
    
        const admin = kafka.admin()   
        await admin.connect() 
        await admin.createTopics({
            topics: [{topic: 'inbound-topic'}]
        })
        await admin.disconnect()

        app = new App();
        await app.start()

        const producer = kafka.producer()
    
        await producer.connect()
        await producer.send({
            topic: 'inbound-topic',
            messages: [{value: 'my-payload'}]
        })

        await producer.disconnect()
        await app.stop()
        console.log('done');
    });
});
