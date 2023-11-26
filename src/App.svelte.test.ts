import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/svelte"

import App from "./App.svelte"

describe("App", () => {
  describe("when launched", () => {
    it("should render the board page", () => {
      const { container } = render(App)

      expect(screen.getByTestId("board")).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })
  })
})
