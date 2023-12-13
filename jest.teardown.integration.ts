/* eslint-disable @typescript-eslint/no-var-requires */
// import os from 'os';
// import path from 'path';
// import rimraf from 'rimraf';

// const DIR = path.join(os.tmpdir(), 'jest_testcontainers_global_setup');
module.exports = async function () {
	// let globalWithKafka = global as typeof globalThis & {
	// 	__NETWORK__: any;
	// 	__KAFKA_CONTAINER__: any;
	// 	__KAFKA_BROKERS__: string[]
	// };
	const globalAny: any = global;
	// const globalBrokerUrl = globalAny.__KAFKA_BROKER__;
	await globalAny.__KAFKA_CONTAINER__.stop();
	await globalAny.__NETWORK__.stop();

	// rimraf.sync(DIR);
};
