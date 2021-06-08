import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import SafariWarning from './SafariWarning'

test('disable prompt after agreeing to proceed', () => {
  let willShowSafariPrompt = true
  render(
    <SafariWarning
      onclick={() => {
        willShowSafariPrompt = false
      }}
    />
  )
  fireEvent(
    screen.getByRole('button'),
    new MouseEvent('click', {
      bubbles: true,
    })
  )
  expect(willShowSafariPrompt).toBe(false)
})
