import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';

class TestContainersEnvironment extends NodeEnvironment {
	constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
		super(config, _context);
	}

	async setup() {
		await super.setup();
	}

	async teardown() {
		await super.teardown();
	}

	getVmContext() {
		return super.getVmContext();
	}
}

module.exports = TestContainersEnvironment;
