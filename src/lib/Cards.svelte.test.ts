import { beforeEach, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/svelte"
import Cards from "./Cards.svelte"

// buttons on screen
const BUTTON = "button"
// button text queries
const PRINT = { name: /print/i }
const GENERATE = { name: /generate cards/i }
// test id
const CARD = "card"

// Immutable seed source.
const mockSeed = { seed: 12345 }
vi.mock("./bingo-utils", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    // Keep other functions
    ...(mod as any),
    // Return a fake mocked seed.
    getSeed: () => mockSeed.seed,
  }
})

describe("Cards", () => {
  beforeEach(() => {
    // Reset seed before each test.
    mockSeed.seed = 12345

    vi.spyOn(window, "print").mockImplementation(vi.fn())
  })

  describe("when loading", () => {
    it("should display 4 cards", () => {
      const dom = render(Cards)
      const cards = screen.getAllByTestId(CARD)

      expect(cards.length).toBe(4)
      expect(cards).toMatchSnapshot()
    })
  })

  describe("when print button is clicked", () => {
    it("should invoke browser print function", async () => {
      render(Cards)

      await fireEvent.click(screen.getByRole(BUTTON, PRINT))

      expect(window.print).toHaveBeenCalled()
    })
  })

  describe("when generate button is clicked", () => {
    it("should generate new set of cards", async () => {
      render(Cards)

      // Change seed before click for test.
      mockSeed.seed = 54321

      await fireEvent.click(screen.getByRole(BUTTON, GENERATE))

      const cards = screen.getAllByTestId(CARD)

      expect(cards).toMatchSnapshot()
    })
  })
})
