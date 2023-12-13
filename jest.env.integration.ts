/* eslint-disable @typescript-eslint/no-var-requires */
// const { readFile } = require('fs').promises;
// import os from 'os';
// import path from 'path';
import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';

// const DIR = path.join(os.tmpdir(), 'jest_testcontainers_global_setup');

class TestContainersEnvironment extends NodeEnvironment {
	constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
		super(config, _context);
	}

	async setup() {
		await super.setup();
		// const kafkaBroker = await readFile(path.join(DIR, 'kafkaBroker'), 'utf8');
		// if (!kafkaBroker) {
		// 	throw new Error('kafkaBroker not found');
		// }
		// this.global.__KAFKA_BROKER__ = kafkaBroker;
	}

	async teardown() {
		await super.teardown();
	}

	getVmContext() {
		return super.getVmContext();
	}
}

module.exports = TestContainersEnvironment;
