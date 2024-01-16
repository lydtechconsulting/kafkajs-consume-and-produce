import { Kafka } from "kafkajs";
import { App } from "../../src/app";
import waitForExpect from "wait-for-expect";
import request from "supertest";

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

        app = new App()
        await app.start()

        const response = await request('http://localhost:3000').get("/version")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual('v1')
        console.log(`Version received: ${JSON.stringify(response.body)}`)

        const producer = kafka.producer()
    
        await producer.connect()
        await producer.send({
            topic: 'inbound-topic',
            messages: [{value: 'my-payload'}]
        })

        await producer.disconnect()

        const consumer = kafka.consumer({groupId: 'test-consumer'})
        await consumer.connect()
        await consumer.subscribe({ topic: 'outbound-topic', fromBeginning: true })
        let received = false
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(`Message received: ${JSON.stringify(message)}`)
                received = true
            },
        })

        await waitForExpect( () => {
            expect(received).toBeTruthy()
        }, 5000);

        await consumer.disconnect()
        await app.stop()
    })
})
