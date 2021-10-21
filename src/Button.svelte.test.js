import Button from "./Button.svelte"
import { render } from "@testing-library/svelte"

describe(Button.name, () => {
  describe("when clicked", () => {
    it("should raise an event", () => {
      const { component, getByRole } = render(Button)
      const click = jest.fn()
      const off = component.$on("click", click)

      getByRole("button").click()
      off()

      expect(click).toHaveBeenCalled()
    })
  })
})
