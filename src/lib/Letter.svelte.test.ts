import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/svelte"
import Letter from "./Letter.svelte"

describe("Letter", () => {
  describe("when letter is not supplied", () => {
    it("shows default letter", () => {
      render(Letter)

      expect(screen.getByText("B")).toBeInTheDocument()
    })
  })

  describe("when new letter is supplied", () => {
    it("shows supplied letter", async () => {
      render(Letter, { letter: "Q" })

      expect(screen.getByText("Q")).toBeInTheDocument()
    })
  })
})
