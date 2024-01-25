import { AppConfig } from "./types";

let config: AppConfig;

export const setConfig = (): void => {
    const kafkaBrokers = [process.env.KAFKA_BROKERS!]
    console.log(`kafkaBrokers: ${kafkaBrokers}`)
    config = {
        server: {
            port: 3000
        },
        kafka: {
            brokerAddress: kafkaBrokers
        },
    };
};

export const getConfig = (): AppConfig => {
    if (!config) {
        throw new Error("Config not set");
    }

    return config;
};
