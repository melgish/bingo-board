import { render, act } from "@testing-library/svelte"
import Ball from "./Ball.svelte"

const SWITCH = "switch"
const CHECKED = { checked: true }
const UNCHECKED = { checked: false }
const HOT = "hot"
const FLIP = "flip"

describe(Ball.name, () => {
  let dom
  /** @type HTMLDivElement */
  let div

  describe("when not checked", () => {
    it("should have aria-checked=false", () => {
      const dom = render(Ball)

      expect(dom.getByRole(SWITCH, UNCHECKED)).toMatchSnapshot()
    })
  })

  describe("when checked", () => {
    it("should have aria-checked=true", () => {
      const dom = render(Ball, CHECKED)

      expect(dom.getByRole(SWITCH, CHECKED)).toMatchSnapshot()
    })
  })

  describe("when ball is clicked", () => {
    let flipped
    let off

    beforeEach(() => {
      flipped = jest.fn()
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
      off()
    })

    it("should emit a flip event", async () => {
      const dom = render(Ball, UNCHECKED)
      off = dom.component.$on(FLIP, flipped)
      const el = dom.getByRole(SWITCH, UNCHECKED)

      // Click the button
      await act(() => el.click())

      // Make sure class is added / then removed
      expect(el).toHaveClass(HOT)
      expect(flipped).toHaveBeenCalled()

      await jest.runOnlyPendingTimers()

      expect(el).not.toHaveClass(HOT)
    })
  })
})
