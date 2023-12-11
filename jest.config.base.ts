import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["node_modules", "coverage", "src/index.ts"],
  detectLeaks: true,
  detectOpenHandles: true,
  transform: {
    "^.*\\.ts$": "ts-jest",
  },
};

export default config;
