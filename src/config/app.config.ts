import { AppConfig } from "./types";

const DEFAULT_KAFKA_URL = "kafka:9093"
let config: AppConfig;

export const setConfig = (): void => {
    let kafkaBrokers: string[] = [DEFAULT_KAFKA_URL]
    const brokerUrlOverride = process.env.KAFKA_BROKERS
    if(brokerUrlOverride) {
        kafkaBrokers = [brokerUrlOverride]
    } 
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
