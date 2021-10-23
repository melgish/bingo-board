import Button from "./Button.svelte"
import { render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"

describe("Button", () => {
  describe("when clicked", () => {
    it("should raise an event", () => {
      const clicked = jest.fn()
      const { component } = render(Button)
      component.$on("click", clicked)

      userEvent.click(screen.getByRole("button"))

      expect(clicked).toHaveBeenCalled()
    })
  })
})
