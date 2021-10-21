import { render } from "@testing-library/svelte"
import Letter from "../src/Letter.svelte"

describe("Letter", () => {
  describe("when letter is not supplied", () => {
    it("shows default letter", () => {
      const { getByText } = render(Letter)

      expect(getByText("B")).toBeInTheDocument()
    })
  })

  describe("when letter is supplied", () => {
    it("shows supplied letter", () => {
      const { getByText } = render(Letter, { props: { letter: "Q" } })

      expect(getByText("Q")).toBeInTheDocument()
    })
  })
})
