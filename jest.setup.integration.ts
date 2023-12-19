import { PrismaClient } from '@prisma/client';
import { Network, StartedNetwork } from 'testcontainers';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";

const DEFAULT_KAFKA_PORT = 9093;
const DEFAULT_POSTGRES_PORT = 5432;

module.exports = async () => {

	let globalTestcontainers = global as typeof globalThis & {
		__NETWORK__: StartedNetwork
		__KAFKA_CONTAINER__: StartedKafkaContainer
		__KAFKA_BROKERS__: string[]
		__POSTGRES_CONTAINER__: StartedPostgreSqlContainer
		__POSTGRES_URL__: string
	};

	const network = await new Network().start();
	globalTestcontainers.__NETWORK__ = network

	const kafkaContainer = await new KafkaContainer(process.env.KAFKA_CONTAINER_IMAGE)
		.withName('kafka')
		.withNetworkMode(network.getName())
		.withNetworkAliases('kafka')
		.withEnvironment({
			'KAFKA_BROKER_ID': '1'
		})
		.withExposedPorts(9092, DEFAULT_KAFKA_PORT)
		.start()

	globalTestcontainers.__KAFKA_CONTAINER__ = kafkaContainer;

	const kafkaPort = kafkaContainer.getMappedPort(DEFAULT_KAFKA_PORT);
    const kafkaHost = kafkaContainer.getHost();

	globalTestcontainers.__KAFKA_BROKERS__ = [`${kafkaHost}:${kafkaPort}`]

	const postgresContainer = await new PostgreSqlContainer().withName('postgres')
		.withNetworkMode(network.getName())
		.withNetworkAliases('postgres')
		.withDatabase('db')
		.withUsername('user')
		.withPassword('password')
		.withExposedPorts(DEFAULT_POSTGRES_PORT)
		.start()

	globalTestcontainers.__POSTGRES_CONTAINER__ = postgresContainer

	const postgresPort = postgresContainer.getMappedPort(DEFAULT_POSTGRES_PORT)
    const postgresHost = postgresContainer.getHost()

	globalTestcontainers.__POSTGRES_URL__ = `${postgresHost}:${postgresPort}`

	const prisma = new PrismaClient({
		datasourceUrl: `postgresql://user:password@${postgresHost}:${postgresPort}/db?schema=demo`
	})

	await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS demo`;
	await prisma.$executeRaw`CREATE TABLE "Version" ("id" SERIAL NOT NULL, "version" TEXT NOT NULL, CONSTRAINT "Version_pkey" PRIMARY KEY ("id"))`;
	
	await prisma.version.create({
		data: {
			version: 'v1',
		},
	})
};

