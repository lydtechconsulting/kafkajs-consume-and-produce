export type ServerConfig = {
  port: number;
};

// todo: change to something meaningful
export type KafkaConfig = {
  brokerAddress: string;
};

export type AppConfig = {
  server: ServerConfig;
  kafka: KafkaConfig;
};
