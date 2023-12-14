import { Network, StartedNetwork } from 'testcontainers';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';

const DEFAULT_KAFKA_PORT = 9093;

module.exports = async () => {

	let globalWithKafka = global as typeof globalThis & {
		__NETWORK__: StartedNetwork;
		__KAFKA_CONTAINER__: StartedKafkaContainer;
		__KAFKA_BROKERS__: string[]
	};

	const network = await new Network().start();
	globalWithKafka.__NETWORK__ = network;

	const kafkaContainer = await new KafkaContainer(
		process.env.KAFKA_CONTAINER_IMAGE
	)
		.withName('kafka')
		.withNetworkMode(network.getName())
		.withNetworkAliases('kafka')
		.withEnvironment({
			// 'KAFKA_LISTENER_SECURITY_PROTOCOL_MAP': 'PLAINTEXT:PLAINTEXT,BROKER:PLAINTEXT',
            // 'KAFKA_ADVERTISED_LISTENERS': 'PLAINTEXT://kafka:9093,BROKER://localhost:9092',
			// 'KAFKA_INTER_BROKER_LISTENER_NAME': 'PLAINTEXT',
			'KAFKA_BROKER_ID': '1',
			'KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR': '1',
			'KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR': '1'
		})
		.withExposedPorts(9092, DEFAULT_KAFKA_PORT)
		.start();

	globalWithKafka.__KAFKA_CONTAINER__ = kafkaContainer;

	const port = kafkaContainer.getMappedPort(DEFAULT_KAFKA_PORT);
    const host = kafkaContainer.getHost();

	globalWithKafka.__KAFKA_BROKERS__ = [`${host}:${port}`]
};

