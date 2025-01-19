module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx?)$": [
      "ts-jest",
      {
        babel: true,
        tsconfig: "tsconfig.app.json",
      },
    ],
  },
  moduleNameMapper: {
    "^app/(.*)$": "<rootDir>/src/app/$1",
    "^common/(.*)$": "<rootDir>/src/common/$1",
    "^features/(.*)$": "<rootDir>/src/features/$1",
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};
