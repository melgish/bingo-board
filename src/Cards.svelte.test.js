import { render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
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
// Mock the getSeed method of bingo-utils.js to return a fixed value.
// This will allow jest snapshots to work and make tests predictable.
jest.mock("../src/bingo-utils", () => ({
  // Keep other functions
  ...jest.requireActual("../src/bingo-utils"),
  // Return the mocked seed
  getSeed: () => mockSeed.seed,
}))

describe("Cards", () => {
  beforeEach(() => {
    // Reset seed before each test.
    mockSeed.seed = 12345

    jest.spyOn(window, "print").mockImplementation(jest.fn())
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
    it("should invoke browser print function", () => {
      const dom = render(Cards)

      userEvent.click(screen.getByRole(BUTTON, PRINT))

      expect(window.print).toHaveBeenCalled()
    })
  })

  describe("when generate button is clicked", () => {
    it("should generate new set of cards", () => {
      const dom = render(Cards)
      // Change seed before click for test.
      mockSeed.seed = 54321

      userEvent.click(screen.getByRole(BUTTON, GENERATE))

      const cards = screen.getAllByTestId(CARD)

      expect(cards).toMatchSnapshot()
    })
  })
})
