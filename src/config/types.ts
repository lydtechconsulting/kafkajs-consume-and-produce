export type ServerConfig = {
  port: number;
};

export type KafkaConfig = {
  brokerAddress: string;
};

export type AppConfig = {
    server: ServerConfig
    kafka: {
        brokerAddress: string[]
    };
};
