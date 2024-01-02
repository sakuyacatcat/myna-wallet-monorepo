/** @type {import('ts-jest').JestConfigWithTsJest} */
import { JestConfigWithTsJest } from "../../node_modules/ts-jest/dist/types";
import { defaults as tsjPreset } from "../../node_modules/ts-jest/presets";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  roots: ["<rootDir>"],
  transform: {
    ...tsjPreset.transform,
  },
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  modulePaths: ["<rootDir>/ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
};

export default jestConfig;
