import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/svelte"
import Button from "./Button.svelte"

describe("Button", () => {
  describe("when clicked", () => {
    it("should raise an event", async () => {
      const clicked = vi.fn()

      const { component } = render(Button)
      component.$on("click", clicked)

      await fireEvent.click(screen.getByRole("button"))

      expect(clicked).toHaveBeenCalled()
    })
  })
})
