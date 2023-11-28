import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/svelte"
import Board from "./Board.svelte"
import calls from "./calls.store"

beforeAll(() => {
  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

const SWITCH = "switch"
const UNCHECKED = { checked: false }
const BUTTON = "button"
const RESET = { name: /reset game/i }
// role of number input
const SPINBUTTON = "spinbutton"
const CHECK_CARD = { name: /check card/i }
// data-testid of card
const CARD = "card"

describe("Board", () => {
  it("should render", () => {
    const { container } = render(Board)

    expect(container).toMatchSnapshot()
  })

  describe("when game starts", () => {
    it("should not have any lit balls", () => {
      render(Board)

      expect(screen.getAllByRole(SWITCH, UNCHECKED).length).toBe(75)
    })
  })

  describe("reset button", () => {
    it("should reset the game", async () => {
      render(Board)
      vi.spyOn(calls, "reset")

      await fireEvent.click(screen.getByRole(BUTTON, RESET))

      expect(calls.reset).toHaveBeenCalled()
    })
  })

  describe("card # input", () => {
    describe("when seed is valid", () => {
      it("should create matching card", async () => {
        render(Board)

        await fireEvent.input(screen.getByRole(SPINBUTTON), {
          target: { value: "12345" },
        })
        await fireEvent.click(screen.getByRole(BUTTON, CHECK_CARD))
        await fireEvent.click(screen.getByRole(SWITCH, { name: /15/ }))

        expect(screen.getByTestId(CARD)).toMatchSnapshot()
        await fireEvent.click(screen.getByRole(BUTTON, { name: /clear/i }))
        expect(screen.queryByTestId(CARD)).toBeFalsy()
      })
    })

    describe("when seed is not valid", () => {
      it("should disable the check card button", async () => {
        render(Board)

        await fireEvent.input(screen.getByRole(SPINBUTTON), {
          target: { value: "5555" },
        })

        expect(screen.getByRole(BUTTON, CHECK_CARD)).toBeDisabled()
      })
    })
  })

  describe("clicking balls", () => {
    it("should update the game", async () => {
      vi.spyOn(calls, "flip")
      render(Board)

      await fireEvent.click(screen.getByRole(SWITCH, { name: /15/ }))

      expect(calls.flip).toHaveBeenCalledWith(15)
    })
  })
})
