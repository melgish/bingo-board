import { act, render } from "@testing-library/svelte"
import GameMap from "./GameMap.svelte"
import { letterT } from "./game-maps"

describe(GameMap.name, () => {
  let dom
  let grid

  beforeEach(() => (dom = render(GameMap)))

  describe("when no map is supplied", () => {
    it("should default to coverall", async () => {
      grid = dom.getByRole("button")

      // should have 25 lit squares
      expect(grid.querySelectorAll(".lit").length).toBe(25)
      expect(dom.container).toMatchSnapshot()
    })
  })

  describe("when map is supplied", () => {
    it("should render the map", async () => {
      await act(() => (dom.component.game = letterT))
      grid = dom.getByRole("button")

      // should only have 9 lit squares
      expect(grid.querySelectorAll(".lit").length).toBe(9)
      expect(dom.container).toMatchSnapshot()
    })
  })

  describe("when button is clicked", () => {
    let click
    let off

    beforeEach(() => {
      click = jest.fn()
      off = dom.component.$on("click", click)
    })

    afterEach(() => off())

    it("should fire an event", async () => {
      const button = dom.getByRole("button")

      await act(() => button.click())

      expect(click).toHaveBeenCalled()
    })
  })
})
