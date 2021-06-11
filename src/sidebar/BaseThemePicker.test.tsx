import React from 'react'
import { render, screen } from '@testing-library/react'
import * as Theme from 'my-theme-type'

import BaseThemePicker from './BaseThemePicker'

test('test existence of important elements', () => {
  const theme = 'ocean'
  render(<BaseThemePicker current={theme} setTheme={() => {}} />)
  const buttons = screen.getAllByRole('button')

  expect(buttons).toHaveLength(4)
  for (let i = 0; i < buttons.length; i++) {
    expect(buttons[i]).toHaveAttribute('theme-base')
    expect(buttons[i]).toMatch
  }

  const themes: Theme.ThemeBase[] = ['ocean', 'desert', 'sakura', 'snow']
  themes
    .map((theme) => theme[0].toUpperCase() + theme.slice(1))
    .forEach((theme) => {
      expect(screen.getByText(theme)).toBeInTheDocument
    })
})
