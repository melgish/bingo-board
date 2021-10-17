import { render, fireEvent } from "@testing-library/svelte"
import Cards from "../src/Cards.svelte"

const SEED = { seed: 12345 }

// Mock the getSeed method of bingo-utils.js to return a fixed value.
// This will allow jest snapshots to work.
jest.mock("../src/bingo-utils", () => ({
  ...jest.requireActual("../src/bingo-utils"),
  getSeed: () => SEED.seed,
}))

describe(Cards.name, () => {
  let dom

  beforeEach(() => {
    jest.spyOn(window, "print").mockImplementationOnce(jest.fn())

    dom = render(Cards)
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
      SEED.seed = 54321

      await fireEvent.click(dom.getByText("Generate Cards"))
      const cards = dom.getByTestId("cards")

      expect(cards).toMatchSnapshot()
    })
  })
})
