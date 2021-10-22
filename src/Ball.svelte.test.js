import { fireEvent } from "@testing-library/dom"
import { render, act } from "@testing-library/svelte"
import Ball from "./Ball.svelte"

describe(Ball.name, () => {
  const SWITCH = "switch"
  const CHECKED = { checked: true }
  const UNCHECKED = { checked: false }
  const HOT = "hot"
  let dom
  /** @type HTMLDivElement */
  let div

  describe("when not checked", () => {
    it("should have aria-checked=false", () => {
      dom = render(Ball)
      div = dom.getByRole(SWITCH, UNCHECKED)

      expect(div).toMatchSnapshot()
    })
  })

  describe("when checked", () => {
    it("should have aria-checked=true", () => {
      dom = render(Ball, CHECKED)
      div = dom.getByRole(SWITCH, CHECKED)

      expect(div).toMatchSnapshot()
    })
  })

  describe("when ball is clicked", () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    it("should emit a flip event", async () => {
      dom = render(Ball, UNCHECKED)
      div = dom.getByRole(SWITCH, UNCHECKED)

      const flipped = jest.fn()
      const off = dom.component.$on("flip", flipped)

      // Click the button
      await act(() => div.click())
      off()

      expect(div).toHaveClass("hot")
      expect(flipped).toHaveBeenCalled()

      await jest.runOnlyPendingTimers()

      expect(div).not.toHaveClass("hot")
    })
  })
})
