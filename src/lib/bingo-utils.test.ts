import { describe, expect, it } from "vitest"
import { getCard, getSeed } from "./bingo-utils"

describe("getSeed", () => {
  it("should return a random number", () => {
    const seed = getSeed()
    expect(seed).toBeGreaterThan(9999)
    expect(seed).toBeLessThan(100000)
  })
})

describe("getCard", () => {
  it("should create a bingo card", () => {
    expect(getCard(12345)).toMatchSnapshot()
  })
})
