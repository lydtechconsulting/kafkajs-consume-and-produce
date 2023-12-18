module.exports = {
	moduleNameMapper: {
		'^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1'
	},
	modulePathIgnorePatterns: ['helpers/*', '<rootDir>/dist', '<rootDir>/schema'],
	testRegex: '(/__tests__/.*\\.integration\\.(test|spec))\\.[jt]sx?$',
	moduleFileExtensions: ['ts', 'js'],
	resetMocks: true,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	globalSetup: '<rootDir>/jest.setup.integration.ts',
	globalTeardown: '<rootDir>/jest.teardown.integration.ts'
};
