import { render, act, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Board from "./Board.svelte"
import calls from "./calls.store"

const SWITCH = "switch"
const UNCHECKED = { checked: false }
const BUTTON = "button"
const RESET = { name: /reset game/i }
const SPINBUTTON = "spinbutton"
const CHECK_CARD = { name: /check card/i }

describe("Board", () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

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
    it("should reset the game", async () => {
      const dom = render(Board)
      const spy = jest.spyOn(calls, "reset")

      userEvent.click(dom.getByRole(BUTTON, RESET))

      expect(spy).toHaveBeenCalled()
    })
  })

  describe("card # input", () => {
    it("should create matching card", async () => {
      const dom = render(Board)

      await act(() => userEvent.type(dom.getByRole(SPINBUTTON), "12345"))

      // const button = await dom.findByRole(BUTTON, CHECK_CARD)

      // expect(button).toBeEnabled()

      expect(dom.getByRole(BUTTON, CHECK_CARD)).toBeEnabled()
    })
  })
})
