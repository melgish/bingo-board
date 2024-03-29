import { describe, expect, it } from "vitest"
import { render } from "@testing-library/svelte"

import Card from "./Card.svelte"
import { getCard } from "./bingo-utils"

const card = getCard(12345)
const calls = {
  // free space
  0: true,
  // first box
  [card.rows[0][0]]: true,
  // last box
  [card.rows[4][4]]: true,
}

describe(Card.name, () => {
  describe("when loaded", () => {
    it("should display the card", () => {
      let dom = render(Card, { card, calls })

      expect(dom.getByTestId("card")).toMatchSnapshot()
      expect(dom.getAllByRole("switch").length).toBe(25)
    })
  })
})
