import { writable } from "svelte/store";

/**
 * Initial state is an empty object with 'free' space selected
 */
const initial = { 0: true };

export default function() {
    const { subscribe, set, update } = writable({...initial});

    /**
     * Flips the state of the current value
     * @param {number} ball
     */
    function flip(ball) {
      // ignore the free space
      if (ball) {
        update(calls => {
          calls[ball] = !calls[ball];
          return calls;
        });
      }
    }

    /**
     * Clears all vlues
     */
    function reset() {
      set({...initial});
    }

    return { subscribe, flip, reset };
}
