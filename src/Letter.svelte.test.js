import { act, render, screen } from "@testing-library/svelte"
import Letter from "../src/Letter.svelte"

describe("Letter", () => {
  describe("when letter is not supplied", () => {
    it("shows default letter", () => {
      const { component } = render(Letter)

      expect(screen.getByText("B")).toBeInTheDocument()
    })
  })

  describe("when new letter is supplied", () => {
    it("shows supplied letter", () => {
      const { component } = render(Letter)
      act(() => (component.letter = "Q"))

      expect(screen.getByText("Q")).toBeInTheDocument()
    })
  })
})
