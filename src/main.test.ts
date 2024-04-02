import { expect, it } from "vitest"
import app from "./main"

it("main should export the app", () => {
  expect(app).toBeDefined()
})
