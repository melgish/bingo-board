import { render, fireEvent } from "@testing-library/svelte"
import Cards from "./Cards.svelte"

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

describe(Cards.name, () => {
  let dom

  beforeEach(() => {
    // Reset seed before each test.
    mockSeed.seed = 12345

    jest.spyOn(window, "print").mockImplementationOnce(jest.fn())

    dom = render(Cards)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("when loading", () => {
    it("should display Cards", () => {
      const cards = dom.getByTestId("cards")

      expect(cards.childElementCount).toBe(4)
      expect(cards).toMatchSnapshot()
    })
  })

  describe("when print button is clicked", () => {
    it("should invoke browser print function", async () => {
      await fireEvent.click(dom.getByText("Print"))

      expect(window.print).toHaveBeenCalled()
    })
  })

  describe("when generate button is clicked", () => {
    it("should generate new set of cards", async () => {
      // Change seed for test.
      mockSeed.seed = 54321

      await fireEvent.click(dom.getByText("Generate Cards"))
      const cards = dom.getByTestId("cards")

      expect(cards).toMatchSnapshot()
    })
  })
})
