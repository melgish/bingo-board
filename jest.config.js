module.exports = {
  collectCoverageFrom: ["src/**/*", "!src/__snapshots__/*.snap"],
  coverageProvider: "babel",
  coverageReporters: [
    // for the human at the console
    "text-summary",
    "html",
    // for Jenkins statistics
    "cobertura",
    // for Sonarqube/CodeCov analysis
    "lcovonly",
  ],
  moduleFileExtensions: ["js", "svelte"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/?!(svelte-routing)"],
}
