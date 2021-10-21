import { render } from "@testing-library/svelte"
import Board from "./Board.svelte"

describe("Board", () => {
  it("should render", () => {
    expect(render(Board)).toBeTruthy()
  })
})
