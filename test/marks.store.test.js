import marks from '../src/marks.store'

describe('marks.store', () => {
  let store
  let current
  let unsubscribe
  let before

  beforeEach(() => {
    store = marks()
    unsubscribe = store.subscribe((value) => (current = value))
    before = current
  })

  afterEach(() => unsubscribe())

  describe('when initialized', () => {
    it('should mark the free space', () => {
      expect(current).toEqual({ 0: true })
    })
  })

  describe('flip', () => {
    describe('when ball is falsy', () => {
      it('should not update subscriptions', () => {
        store.flip(0)

        expect(before).toBe(current)
      })
    })

    describe('when ball is truthy', () => {
      it('should update subscriptions', () => {
        store.flip(5)

        expect(before).not.toBe(current)
        expect(current[5]).toBeTruthy()
      })
    })
  })

  describe('reset', () => {
    it('should restore the iniital state', () => {
      store.reset()

      expect(before).not.toBe(current)
      expect(current).toEqual({ 0: true })
    })
  })
})
