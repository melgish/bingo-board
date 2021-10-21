import { act, render } from "@testing-library/svelte"
import GameMaps from "./GameMaps.svelte"
import { GAME_MAPS } from "./game-maps"
describe("GameMaps", () => {
  let dom

  // Take control of timers to control animations.
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  const getButton = (index) => dom.getAllByRole("button")[index]
  const clickButton = (index) => act(() => getButton(index).click())

  beforeEach(async () => {
    dom = render(GameMaps)
    // choose a non normal map
    await clickButton(2)
  })

  describe("when rendered", () => {
    it("should display all maps", async () => {
      const games = dom.getAllByRole("button")

      // Should have 1 for each map, plus normals
      expect(games.length).toBe(GAME_MAPS.length + 1)
    })
  })

  describe("when interval passes", () => {
    it("should not update normal to next map", async () => {
      expect(getButton(0)).toMatchSnapshot()

      await jest.runOnlyPendingTimers()
      await jest.runOnlyPendingTimers()

      expect(getButton(0)).toMatchSnapshot()
    })
  })

  describe("when normal game is selected", () => {
    it("should animate the map", async () => {
      await clickButton(0)

      await jest.runOnlyPendingTimers()
      await jest.runOnlyPendingTimers()

      expect(getButton(0)).toMatchSnapshot()
    })
  })
})
