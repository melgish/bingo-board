import { GAME_MAPS } from '../src/game-maps'

describe('GAME_MAPS', () => {
  it('should represent games', () => {
    expect(GAME_MAPS).toMatchSnapshot()
  })
})
