import { Server } from "node:http";
import express, { Application } from "express";
import { getConfig, setConfig } from "./config/appConfig";
import { mountRoutes } from "./routes";
import { DemoConsumer } from "./handler/DemoConsumer";
import { KafkaConfig } from "kafkajs";

export class App {
    private readonly app: Application

    private server?: Server
    private demoConsumer?: DemoConsumer

    constructor() {
        setConfig();
        this.app = express();
        mountRoutes(this.app);
    }

    start() {
        const config = getConfig();

        const port = config.server.port;

        this.server = this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

        const kafkaConfig = {
            brokers: config.kafka.brokerAddress
        } as KafkaConfig
        this.demoConsumer = new DemoConsumer(kafkaConfig);
        this.demoConsumer.listen();
    }

    stop() {
        this.server?.close()
        this.demoConsumer?.disconnect()
    }
}
