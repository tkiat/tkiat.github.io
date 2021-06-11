import React from 'react'
import { render, screen } from '@testing-library/react'

import ThemePicker from './ThemePicker'

test('test existence of important elements', () => {
  const theme = 'ocean'
  render(<ThemePicker base={theme} supplement={theme} isActive={true} setTheme={() => {}} />)
  expect(screen.getByRole('button')).toBeInTheDocument()

  expect(screen.getByRole('button')).toHaveAttribute('theme-base')
  expect(screen.getByRole('button')).toHaveAttribute('theme-supplement')

  expect(screen.getByText('Header')).toBeInTheDocument()
  expect(screen.getByText('This is sample text.')).toBeInTheDocument()
})
