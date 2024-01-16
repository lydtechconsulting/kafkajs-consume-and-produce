import { Kafka } from "kafkajs";
import { App } from "../../src/app";
import waitForExpect from "wait-for-expect";
import request from "supertest";

describe("end to end integration tests", () => {

    let app: App
    let kafka: Kafka

	beforeAll(async () => {
        const globalAny: any = global;
		const globalBrokerUrl = globalAny.__KAFKA_BROKERS__;
        kafka = new Kafka({
            clientId: 'test-client',
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
	});

	afterAll(async () => {
		await app.stop()
	});

    /**
     * Prove the database is correctly seeded with the version.
     */
    test("get version", async () => {
        const versionResponse = await request('http://localhost:3000').get("/version")
        expect(versionResponse.statusCode).toBe(200)
        expect(versionResponse.body).toEqual('v1')
        console.log(`Version received: ${JSON.stringify(versionResponse.body)}`)
    })

    /**
     * Prove the database can be written to and queried via the REST API.
     */
    test("create and retrieve item", async () => {
        // Test POST item.
        const createItemResponse = await request('http://localhost:3000').post("/items")
            .send({name: "test-item"})
            .set('Content-type', 'application/json')
        expect(createItemResponse.statusCode).toBe(201)
        expect(createItemResponse.header.location).toBeDefined()
        console.log(`Item created with id: ${JSON.stringify(createItemResponse.header.location)}`)

        const getItemResponse = await request('http://localhost:3000').get(`/items/${createItemResponse.header.location}`)
        expect(getItemResponse.statusCode).toBe(200)
        expect(getItemResponse.body.name).toEqual('test-item')
    })

    /**
     * Prove that Kafka messages can be consumed and produced by the application.
     */
    test("consume and produce messages", async () => {
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
    })
})
