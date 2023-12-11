import type { Config } from "@jest/types";
import baseConfig from "./jest.config.base";

const unitTestConfig: Config.InitialOptions = {
  ...baseConfig,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

export default unitTestConfig;
