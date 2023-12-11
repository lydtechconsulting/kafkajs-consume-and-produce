import type { Config } from "@jest/types";
import baseConfig from "./jest.config.base";

const intgerationTestConfig: Config.InitialOptions = {
  ...baseConfig,
  collectCoverageFrom: ["__tests__/integration/**/*.ts"],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  testMatch: ["<rootDir>/__tests__/integration/**/*.test.ts"],
};

export default intgerationTestConfig;
