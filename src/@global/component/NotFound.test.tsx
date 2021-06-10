import React from 'react'
import { render, screen } from '@testing-library/react'

import NotFound from './NotFound'

test('contain link to the main page', () => {
  render(<NotFound className="" />)
  expect(screen.getByRole('link')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/')
})
