import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/svelte"
import Button from "./Button.svelte"

describe("Button", () => {
  describe("when clicked", () => {
    it("should raise an event", async () => {
      const onclick = vi.fn()

      render(Button, { onclick })

      await fireEvent.click(screen.getByRole("button"))

      expect(onclick).toHaveBeenCalled()
    })
  })
})
