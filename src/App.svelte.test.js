import { act, render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import App from "./App.svelte"

const LINK = "link"
const BOARD = { name: /board/i }
const CARDS = { name: /cards/i }

describe("App", () => {
  describe("when launched", () => {
    it("should render the board page", () => {
      const dom = render(App)

      expect(screen.getByTestId("board")).toBeInTheDocument()
      expect(dom.container).toMatchSnapshot()
    })
  })

  // describe("when cards link is clicked", () => {
  //   it("should render the cards page", async () => {
  //     const dom = reander(App)

  //     await act(() => userEvent.click(screen.getByRole(LINK, CARDS)))

  //     expect(screen.queryByTestId("card")).toBeTruthy()
  //     expect(dom.container).toMatchSnapshot()
  //   })
  // })
})
