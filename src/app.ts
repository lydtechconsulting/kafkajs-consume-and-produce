import { Server } from "node:http";
import express, { Application } from "express";
import { getConfig, setConfig } from "./config/appConfig";
import { mountRoutes } from "./routes";
import { ItemConsumer } from "./handler/item.consumer";
import { KafkaConfig } from "kafkajs";
import KafkaService from "./service/kafka.service";
import { ItemService } from "./service/item.service";

export class App {
    private readonly app: Application

    private server?: Server
    private itemConsumer?: ItemConsumer

    constructor() {
        setConfig();
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        mountRoutes(this.app);
    }

    async start() {
        const config = getConfig();

        const port = config.server.port;

        this.server = this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

        const kafkaConfig = {
            brokers: config.kafka.brokerAddress
        } as KafkaConfig
        this.itemConsumer = new ItemConsumer(new ItemService(new KafkaService(kafkaConfig)), kafkaConfig);
        await this.itemConsumer.listen();
    }

    async stop() {
        this.server?.close()
        await this.itemConsumer?.disconnect()
    }
}
