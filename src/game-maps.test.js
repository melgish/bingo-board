import { GAME_MAPS } from "./game-maps"

describe("GAME_MAPS", () => {
  it("should represent games", () => {
    expect(GAME_MAPS).toMatchSnapshot()
  })
})
