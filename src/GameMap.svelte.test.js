import { act, render } from "@testing-library/svelte"
import GameMap from "./GameMap.svelte"
import { letterT, letterX } from "./game-maps"

const BUTTON = "button"
const FILLED = "filled"

describe("GameMap", () => {
  // process the game into a string of bits
  const toBit = (div) => {
    return div.classList.contains(FILLED) ? "1" : "0"
  }
  const toBits = (dom) => {
    const divs = dom.getByRole("button").querySelectorAll("div")
    return { bits: Array.from(divs, toBit).join("") }
  }

  describe("when no map is supplied", () => {
    it("should default to coverall", () => {
      const dom = render(GameMap)

      expect(toBits(dom)).toMatchSnapshot("all-ones")
    })
  })

  describe("when map is supplied", () => {
    it("should render the map", () => {
      const dom = render(GameMap, { game: letterT })

      expect(toBits(dom)).toMatchSnapshot("letter-t")
    })
  })

  describe("when button is clicked", () => {
    let dom
    let click
    let off

    beforeEach(() => {
      dom = render(GameMap, { game: letterX })

      click = jest.fn()
      off = dom.component.$on("click", click)
    })

    afterEach(() => off())

    it("should fire an event", async () => {
      await act(() => dom.getByRole(BUTTON).click())

      expect(click).toHaveBeenCalled()
      expect(toBits(dom)).toMatchSnapshot("letter-x")
    })
  })
})
