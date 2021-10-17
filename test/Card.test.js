import { render } from "@testing-library/svelte";
import Card from "../src/Card.svelte";
import { GAME, getCard } from "../src/bingo-utils";

const card = getCard("12345");
const calls = {
  // free space
  0: true,
  // first box
  [card.rows[0][0]]: true,
  // last box
  [card.rows[4][4]]: true,
};

describe(Card.name, () => {
  it("should display all letters", () => {
    const { getByText } = render(Card);
    GAME.split("").forEach((c) => {
      expect(getByText(c)).toBeTruthy();
    });
  });
  it("should display the card", () => {
    const { getAllByRole, getByText } = render(Card, {
      props: { card, calls },
    });
    const balls = getAllByRole("button");

    expect(balls.length).toBe(25);
    expect(balls[0]).toHaveClass("lit");
    expect(balls[12]).toHaveClass("lit");
    expect(balls[1]).not.toHaveClass("lit");
    expect(getByText(card.seed.toString())).toBeTruthy();
  });
});
