module.exports = {
  collectCoverageFrom: ["src/**/*"],
  coverageProvider: "babel",
  coverageReporters: ["html"],
  moduleFileExtensions: ["js", "svelte"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.js$": "babel-jest",
  },
};
