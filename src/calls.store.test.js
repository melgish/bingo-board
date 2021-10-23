import calls from "./calls.store"

describe("calls.store", () => {
  it("should be a marks.store instance", () => {
    expect(calls.subscribe).toBeDefined()
    expect(calls.flip).toBeDefined()
    expect(calls.reset).toBeDefined()
  })
})
