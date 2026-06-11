// spell-checker: ignore onflip
import { act, fireEvent, render, screen } from "@testing-library/svelte"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import Ball from "./Ball.svelte"

// Ball role is a switch
const SWITCH = "switch"
// With checked and unchecked states
const CHECKED = { checked: true }
const UNCHECKED = { checked: false }
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
      const onflip = vi.fn()
      render(Ball, { checked: true, onflip })
      const el = screen.getByRole(SWITCH)

      await fireEvent.click(el)

      // Make sure class is added / then removed
      expect(el).toHaveClass("hot")
      expect(onflip).toHaveBeenCalled()

      await act(() => vi.runOnlyPendingTimers())

      expect(el).not.toHaveClass(HOT)
    })
  })
})
