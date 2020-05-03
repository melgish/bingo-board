import gen from "random-seed"
import shuffle from 'shuffle-array';

export const GAME = 'COVID';

// Array of indexes 0 - 4 because I'm that lazy
const BINGO = GAME.split('').map((v, k) => k);
const FREE = 2;
const RNG = gen.create();

// Array of all available bingo numbers arranged in board layout
// [1, 2, ... 15]
// [16, 17, ... 30]
// ...
export const BOARD = BINGO.map(
  i => Array.from({length: 15}, (v, k) => (i * 15) + k + 1)
);


/**
 * Create new 5 digit seed
 *
 * @return {number} random 5 digit number
 */
export function getSeed() {
  return RNG.intBetween(10000, 100000);
}

/**
 * Generate and return card for given seed
 *
 * @param {number} seed
 */
export function getCard(seed) {
  const picks = 5;
  // Use repeatable random number generator.
  const rng = gen.create(seed).random;
  // Capture 5 random values from each letter
  const cols = BINGO.map(i => shuffle.pick(BOARD[i], { picks, rng }));
  // Clear the free space
  cols[FREE][FREE] = 0;
  // Arrange in rows
  const rows = BINGO.map(i => BINGO.map(j => cols[j][i]));

  return { seed, rows };
}

