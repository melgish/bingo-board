import { render, act } from "@testing-library/svelte"
import BallTest from "./BallTest.svelte"
import Ball from "../src/Ball.svelte"

describe(Ball.name, () => {
  describe("when clicked", () => {
    it("should raise flip event", async () => {
      const { getByRole } = render(BallTest)
      const button = getByRole("button")

      jest.useFakeTimers()

      // Verify slot and starting state
      expect(button).toHaveTextContent("false")
      expect(button).not.toHaveClass("lit")
      expect(button).not.toHaveClass("hot")

      // Click the button
      await act(() => button.click())

      // Verify state change
      expect(button).toHaveClass("hot")
      expect(button).toHaveClass("lit")

      await jest.runOnlyPendingTimers()

      // Verify that highlight ends with timeout
      expect(button).not.toHaveClass("hot")
      expect(button).toHaveTextContent("true")
    })
  })
})
