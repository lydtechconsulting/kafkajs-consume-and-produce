import { Server } from "node:http";
import express, { Application } from "express";
import { getConfig, setConfig } from "./config/appConfig";
import { mountRoutes } from "./routes";
import { DemoConsumer } from "./handler/demo.consumer";
import { KafkaConfig } from "kafkajs";
import KafkaService from "./service/kafka.service";
import { DemoService } from "./service/demo.service";

export class App {
    private readonly app: Application

    private server?: Server
    private demoConsumer?: DemoConsumer

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
        this.demoConsumer = new DemoConsumer(new DemoService(new KafkaService(kafkaConfig)), kafkaConfig);
        await this.demoConsumer.listen();
    }

    async stop() {
        this.server?.close()
        await this.demoConsumer?.disconnect()
    }
}
