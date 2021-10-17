import { render, g } from "@testing-library/svelte";
import Cards from "../src/Cards.svelte";

describe(Cards.name, () => {
    it('should display multiple Cards', () => {
        const { getByTestId } = render(Cards);
        const cards = getByTestId('cards');
        expect(cards.childElementCount).toBe(4); 
    })
})