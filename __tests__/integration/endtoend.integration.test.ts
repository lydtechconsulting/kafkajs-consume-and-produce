import { Kafka, KafkaMessage } from "kafkajs";
import { App } from "../../src/app";
import waitForExpect from "wait-for-expect";
import request from "supertest";
import crypto from "crypto";

describe("end to end integration tests", () => {

    let app: App
    let kafka: Kafka

	beforeAll(async () => {
        const brokerUrl = process.env.KAFKA_BROKERS
        kafka = new Kafka({
            clientId: 'test-client',
            brokers: [brokerUrl!],
        })    
    
        const admin = kafka.admin()   
        await admin.connect() 
        await admin.createTopics({
            topics: [{topic: 'create-item'}, {topic: 'item-created'}]
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
     * Prove that a REST POST request to create an item results in an item being persisted to the database, that the item can be retrieved via a GET request, and that an outbound 'item-created' event is emitted.
     */
    test("create and retrieve item via REST API", async () => {
        // The item name to create.
        const itemName = crypto.randomBytes(4).toString('hex');

        // Start the consumer on the outbound 'item-created' topic.
        const consumer = kafka.consumer({groupId: 'test-consumer'})
        await consumer.connect()
        await consumer.subscribe({ topic: 'item-created', fromBeginning: false })
        const consumedMessages: any[] = []
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(`Message received: ${JSON.stringify(message)}`)
                const parsedMessage = JSON.parse(message.value?.toString() || '{}')
                if(parsedMessage['name'] === itemName) {
                    consumedMessages.push(parsedMessage);
                }
            }
        })

        // POST item to create.
        const createItemResponse = await request('http://localhost:3000').post("/items")
            .send({name: itemName})
            .set('Content-type', 'application/json')
        expect(createItemResponse.statusCode).toBe(201)
        expect(createItemResponse.header.location).toBeDefined()
        console.log(`Item created with id: ${JSON.stringify(createItemResponse.header.location)}`)

        // GET item to retrieve.
        const getItemResponse = await request('http://localhost:3000').get(`/items/${createItemResponse.header.location}`)
        expect(getItemResponse.statusCode).toBe(200)
        expect(getItemResponse.body.name).toEqual(itemName)

        // Wait until the outbound 'item-created' event is consumed by the test consumer
        await waitForExpect( async () => {
            expect(consumedMessages.length).toEqual(1)
        })
        await consumer.disconnect()

        // The item id of the REST response should match the item id from the event.
        expect(getItemResponse.body.id).toEqual(consumedMessages[0]?.id)
    })

    /**
     * Prove that an inbound 'create-item' event can be consumed by the application, that an outbound 'item-created' event is emitted, and the item is persisted to the database.
     */
    test("create item via Kafka event", async () => {
        // The item name to create.
        const itemName = crypto.randomBytes(4).toString('hex');

        // Start the consumer on the outbound 'item-created' topic.
        const consumer = kafka.consumer({groupId: 'test-consumer'})
        await consumer.connect()
        await consumer.subscribe({ topic: 'item-created', fromBeginning: true })
        const consumedMessages: any[] = []
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(`Message received: ${JSON.stringify(message)}`)
                const parsedMessage = JSON.parse(message.value?.toString() || '{}')
                if(parsedMessage['name'] === itemName) {
                    consumedMessages.push(parsedMessage);
                }
            }
        })

        // Produce an event to the inbound 'create-item' topic.
        const payload = {name: itemName}
        const producer = kafka.producer()
        await producer.connect()
        await producer.send({
            topic: 'create-item',
            messages: [{value: JSON.stringify(payload)}]
        })
        await producer.disconnect()

        // Wait until the outbound 'item-created' event is consumed by the test consumer
        await waitForExpect( async () => {
            expect(consumedMessages.length).toEqual(1)
        })
        await consumer.disconnect()

        // GET item via the REST API using the itemId from the event to ensure persisted.
        const getItemResponse = await request('http://localhost:3000').get(`/items/${consumedMessages[0]?.id}`)
        expect(getItemResponse.statusCode).toBe(200)
        expect(getItemResponse.body.name).toEqual(itemName)
    })
})
