import { writable } from "svelte/store"

export type Marks = {
  [key: number]: boolean
}

/**
 * Initial state is an empty object with 'free' space selected
 */
const initial: Marks = { 0: true }

export default function () {
  const { subscribe, set, update } = writable({ ...initial })

  /**
   * Flips the state of the current value
   * @param ball number to flip
   */
  function flip(ball: number) {
    // ignore the free space
    if (ball) {
      update((calls) => ({
        ...calls,
        [ball]: !calls[ball],
      }))
    }
  }

  /**
   * Clears all vlues
   */
  function reset() {
    set({ ...initial })
  }

  return { subscribe, flip, reset }
}
