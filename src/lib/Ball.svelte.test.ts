import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import { act, fireEvent, render, screen } from "@testing-library/svelte"
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

beforeAll(() => {
  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

describe("Ball", () => {
  describe("when not checked", () => {
    it("should have aria-checked=false", () => {
      render(Ball)

      expect(screen.getByRole(SWITCH, UNCHECKED)).toMatchSnapshot()
    })
  })

  describe("when checked", () => {
    it("should have aria-checked=true", () => {
      render(Ball, CHECKED)

      expect(screen.getByRole(SWITCH, CHECKED)).toMatchSnapshot()
    })
  })

  describe("when ball is clicked", () => {
    it("should emit a flip event", async () => {
      const { component } = render(Ball, UNCHECKED)
      const el = screen.getByRole(SWITCH)
      const flipped = vi.fn()

      component.$on(FLIP, flipped)

      await fireEvent.click(el)

      // Make sure class is added / then removed
      expect(el).toHaveClass("hot")
      expect(flipped).toHaveBeenCalled()

      await act(() => vi.runOnlyPendingTimers())

      expect(el).not.toHaveClass(HOT)
    })
  })
})
