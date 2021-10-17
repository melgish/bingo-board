import { render, act } from '@testing-library/svelte'
import ButtonTest from './ButtonTest.svelte'
import Button from '../src/Button.svelte'

const DISABLED = { props: { disabled: true } }
const ENABLED = { props: { disabled: false } }

describe(Button.name, () => {
  describe('when clicked', () => {
    it('should raise click event', async () => {
      const { getByRole } = render(ButtonTest, ENABLED)
      const button = getByRole('button')

      // Verify starting state
      expect(button).not.toHaveTextContent('clicked')

      // Click the button
      await act(() => button.click())

      // Verify slot content
      expect(button).toHaveTextContent('clicked')
    })
  })

  describe('when disabled', () => {
    it('should not raise click event', async () => {
      const { getByRole } = render(ButtonTest, DISABLED)
      const button = getByRole('button')

      // Click the button
      await act(() => button.click())

      // Verify slot content
      expect(button).not.toHaveTextContent('clicked')
    })
  })

  it('should default to enabled', () => {
    const { getByRole } = render(Button)
    const button = getByRole('button')

    expect(button.disabled).toBeFalsy()
  })
})
