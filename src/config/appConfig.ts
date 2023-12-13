import { AppConfig } from "./types";

let config: AppConfig;

// info: you can make this so it reads different variables from process.env, custom config files, etc...
//       whilst ensuring the rest of the app only cares about the config, not how it's loaded
//       and keeps the typescript types in sync.
// note: you may want to 'parameterize' this for different environments
export const setConfig = (): void => {

    let kafkaBrokers: string[] = ["localhost:9092"]
    const globalAny: any = global;
		const globalBrokerUrl = globalAny.__KAFKA_BROKERS__;
    if(globalBrokerUrl) {
        kafkaBrokers = globalBrokerUrl
    } 
    config = {
        server: {
            port: 1234
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
