module.exports = {
  collectCoverageFrom: ["src/**/*", "!src/__snapshots__/*.snap"],
  coverageProvider: "babel",
  coverageReporters: ["html"],
  moduleFileExtensions: ["js", "svelte"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.js$": "babel-jest",
  },
}
