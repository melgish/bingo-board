import Button from "./Button.svelte"
import { act, render } from "@testing-library/svelte"

describe(Button.name, () => {
  const clicky = "clicky"
  let dom
  /** @type HTMLButtonElement */
  let button

  beforeEach(() => {
    dom = render(Button, { name: clicky })
    button = dom.getByRole("button")
  })

  describe("when rendered", () => {
    it("should include the name", () => {
      expect(button.name).toBe(clicky)
      expect(button).toMatchSnapshot()
    })
  })

  describe("when clicked", () => {
    let clicked
    let off
    beforeEach(() => {
      // Listen to the click event
      clicked = jest.fn()
      off = dom.component.$on("click", clicked)
    })

    afterEach(() => off())

    it("should raise an event", async () => {
      await act(() => button.click())

      expect(clicked).toHaveBeenCalled()
    })
  })
})
