import { Network } from 'testcontainers';
import { KafkaContainer } from '@testcontainers/kafka';
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import seed from './prisma/seed';
import { execSync } from 'child_process';

const DEFAULT_KAFKA_PORT = 9093;
const DEFAULT_POSTGRES_PORT = 5432;

module.exports = async () => {

	const network = await new Network().start();

	let kafkaContainer = new KafkaContainer(process.env.KAFKA_CONTAINER_IMAGE)
		.withName('kafka')
		.withNetworkMode(network.getName())
		.withNetworkAliases('kafka')
		.withEnvironment({
			'KAFKA_BROKER_ID': '1'
		})
		.withExposedPorts(9092, DEFAULT_KAFKA_PORT)

	if(process.env.TESTCONTAINERS_REUSE_ENABLE === 'true') {
		kafkaContainer = kafkaContainer.withReuse()
	}
	const startedKafkaContainer = await kafkaContainer.start()
	const kafkaPort = startedKafkaContainer.getMappedPort(DEFAULT_KAFKA_PORT);
    const kafkaHost = startedKafkaContainer.getHost();
	process.env.KAFKA_BROKERS = `${kafkaHost}:${kafkaPort}`

	let postgresContainer = new PostgreSqlContainer().withName('postgres')
		.withNetworkMode(network.getName())
		.withNetworkAliases('postgres')
		.withDatabase('db')
		.withUsername('user')
		.withPassword('password')
		.withExposedPorts(DEFAULT_POSTGRES_PORT)
	if(process.env.TESTCONTAINERS_REUSE_ENABLE === 'true') {
		postgresContainer = postgresContainer.withReuse()
	}
	const startedPostgresContainer = await postgresContainer.start()
	const postgresPort = startedPostgresContainer.getMappedPort(DEFAULT_POSTGRES_PORT)
    const postgresHost = startedPostgresContainer.getHost()
	process.env.DATABASE_URL = `postgresql://user:password@${postgresHost}:${postgresPort}/db?schema=demo`

	// Run the Prisma migration scripts.
	execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });

	// Seed the database.
	await seed();
};

