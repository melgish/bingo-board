import { act, render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Ball from "./Ball.svelte"

// Ball role is a switch
const SWITCH = "switch"
// With checked and unchecked states
const CHECKED = { checked: true }
const UNCHECKED = { checked: false }
// And flip event
const FLIP = "flip"
// With transition highlight
const HOT = "hot"

beforeAll(() => jest.useFakeTimers())
afterAll(() => jest.useRealTimers())

describe("Ball", () => {
  describe("when not checked", () => {
    it("should have aria-checked=false", () => {
      const dom = render(Ball)
      expect(screen.getByRole(SWITCH, UNCHECKED)).toMatchSnapshot()
    })
  })

  describe("when checked", () => {
    it("should have aria-checked=true", () => {
      const dom = render(Ball, CHECKED)

      expect(screen.getByRole(SWITCH, CHECKED)).toMatchSnapshot()
    })
  })

  describe("when ball is clicked", () => {
    let flipped
    let off

    beforeEach(() => {
      flipped = jest.fn()
    })

    it("should emit a flip event", async () => {
      const { component } = render(Ball, UNCHECKED)
      const el = screen.getByRole(SWITCH)
      const flipped = jest.fn()
      component.$on(FLIP, flipped)

      await act(() => userEvent.click(el))

      // Make sure class is added / then removed
      expect(el).toHaveClass(HOT)
      expect(flipped).toHaveBeenCalled()

      await jest.runOnlyPendingTimers()

      expect(el).not.toHaveClass(HOT)
    })
  })
})
