import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/svelte"
import GameMaps from "./GameMaps.svelte"
import { GAME_MAPS } from "./game-maps"

function getButton(index: number)  {
  return screen.getAllByRole("button")[index];
}

// Take control of timers to control animations.
beforeAll(() => {
  vi.useFakeTimers()
})
afterAll(() => {
  vi.useRealTimers()
})

describe("GameMaps", () => {
  describe("when rendered", () => {
    it("should display all maps", async () => {
      render(GameMaps);
      const games = screen.getAllByRole("button")

      // Should have 1 for each map, plus normals
      expect(games.length).toBe(GAME_MAPS.length + 1)
    })
  })

  describe("when interval passes", () => {
    it("should not update normal to next map", async () => {
      render(GameMaps);

      expect(getButton(0)).toMatchSnapshot()

      await act(() => vi.runOnlyPendingTimers())
      await act(() => vi.runOnlyPendingTimers())

      expect(getButton(0)).toMatchSnapshot()
    })
  })

  describe("when normal game is selected", () => {
    it("should animate the map", async () => {
      render(GameMaps);

      await fireEvent.click(getButton(0));

      await act(() => vi.runOnlyPendingTimers())
      await act(() => vi.runOnlyPendingTimers())

      expect(getButton(0)).toMatchSnapshot()
    })
  })
})
