import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/svelte"
import GameMap from "./GameMap.svelte"
import { letterT, letterX } from "./game-maps"

const BUTTON = "button"
const FILLED = "filled"

describe("GameMap", () => {
  // process the game into a string of bits
  const toBit = (div: HTMLDivElement) => {
    return div.classList.contains(FILLED) ? "1" : "0"
  }
  const toBits = () => {
    const divs = screen.getByRole("button").querySelectorAll("div")
    return { bits: Array.from(divs, toBit).join("") }
  }

  describe("when no map is supplied", () => {
    it("should default to coverall", () => {
      render(GameMap)

      expect(toBits()).toMatchSnapshot("all-ones")
    })
  })

  describe("when map is supplied", () => {
    it("should render the map", () => {
      render(GameMap, { game: letterT })

      expect(toBits()).toMatchSnapshot("letter-t")
    })
  })

  describe("when button is clicked", () => {
    it("should fire an event", async () => {
      const { component } = render(GameMap, { game: letterX })
      const click = vi.fn()
      component.$on("click", click)

      await fireEvent.click(screen.getByRole(BUTTON))

      expect(click).toHaveBeenCalled()
      expect(toBits()).toMatchSnapshot("letter-x")
    })
  })
})
