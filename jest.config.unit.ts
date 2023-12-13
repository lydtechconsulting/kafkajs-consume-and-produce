// import type { Config } from "@jest/types";
// import baseConfig from "./jest.config.base";

// const unitTestConfig: Config.InitialOptions = {
//   ...baseConfig,
//   collectCoverageFrom: ["src/**/*.ts"],
//   coverageThreshold: {
//     global: {
//       statements: 0,
//       branches: 0,
//       functions: 0,
//       lines: 0,
//     },
//   },
//   testMatch: ["<rootDir>/src/**/*.test.ts"],
// };

// export default unitTestConfig;

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
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'node',
	// testResultsProcessor: 'jest-sonar-reporter',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	}
};
