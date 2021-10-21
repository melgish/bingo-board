import { render, act } from "@testing-library/svelte"
import Ball from "./Ball.svelte"

describe(Ball.name, () => {
  describe("when button is not lit", () => {
    it("should not have lit class", () => {
      const { component, getByRole } = render(Ball)
      const button = getByRole("button")

      expect(button).not.toHaveClass("lit")
      expect(button.textContent.trim()).toBe("")
    })
  })

  describe("when button is lit", () => {
    it("should have lit class", () => {
      const props = { lit: true }
      const { component, getByRole } = render(Ball, { props })

      expect(getByRole("button")).toHaveClass("lit")
    })
  })

  describe("when button is clicked", () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    it("should emit a flip event", async () => {
      const flip = jest.fn()
      const { component, getByRole } = render(Ball)
      const button = getByRole("button")
      const off = component.$on("flip", flip)

      // Click the button
      await act(() => button.click())
      off()

      expect(flip).toHaveBeenCalled()
      expect(button).toHaveClass("hot")

      await jest.runOnlyPendingTimers()

      expect(button).not.toHaveClass("hot")
    })
  })
})
