export type ServerConfig = {
  port: number;
};

// todo: change to something meaningful
export type KafkaConfig = {
  brokerAddress: string;
};

export type AppConfig = {
    // get<T>(arg0: string): unknown
    server: ServerConfig
    kafka: {
        brokerAddress: string[]
    };
};
