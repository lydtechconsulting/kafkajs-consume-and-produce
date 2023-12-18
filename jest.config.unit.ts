module.exports = {
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json'
		}
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.js',
		'*.js',
		'**/*.ts',
		'*.ts',
		'!__tests__/**/*.js',
		'!__mocks__/**/*.js',
		'!integration*/**',
		'!jest*.js',
		'!coverage/**',
		'!**/*.d.ts',
		'!schema/*.js',
		'!config/**'
	],
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1'
	},
	modulePathIgnorePatterns: ['helpers/*', '<rootDir>/dist', '<rootDir>/schema', 'component/*', 'integration/*'],
	moduleFileExtensions: ['ts', 'js'],
	resetMocks: true,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	}
};
