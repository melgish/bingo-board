import { render, act, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Board from "./Board.svelte"
import calls from "./calls.store"

beforeAll(() => jest.useFakeTimers())
afterAll(() => jest.useRealTimers())

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
    const { component } = render(Board)

    expect(component).toMatchSnapshot()
  })

  describe("when game starts", () => {
    it("should not have any lit balls", () => {
      const dom = render(Board)

      expect(screen.getAllByRole(SWITCH, UNCHECKED).length).toBe(75)
    })
  })

  describe("reset button", () => {
    it("should reset the game", () => {
      const dom = render(Board)
      jest.spyOn(calls, "reset")

      userEvent.click(screen.getByRole(BUTTON, RESET))

      expect(calls.reset).toHaveBeenCalled()
    })
  })

  describe("card # input", () => {
    it("should create matching card", async () => {
      const dom = render(Board)

      await act(() => userEvent.type(screen.getByRole(SPINBUTTON), "12345"))
      await act(() => userEvent.click(screen.getByRole(BUTTON, CHECK_CARD)))
      await act(() => userEvent.click(screen.getByRole(SWITCH, { name: /15/ })))

      expect(screen.getByTestId(CARD)).toMatchSnapshot()

      await act(() =>
        userEvent.click(screen.getByRole(BUTTON, { name: /clear/i }))
      )

      expect(screen.queryByTestId(CARD)).toBeFalsy()
    })
  })

  describe("clicking balls", () => {
    it("should update the game", async () => {
      jest.spyOn(calls, "flip")
      const { component } = render(Board)

      userEvent.click(screen.getByRole(SWITCH, { name: /15/ }))

      expect(calls.flip).toHaveBeenCalledWith(15)
    })
  })
})
