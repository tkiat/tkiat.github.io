import React from 'react'
import { render } from '@testing-library/react'

import NotFound from './NotFound'

test('contain link to the main page', () => {
  const { getByRole } = render(<NotFound className="" />)
  expect(getByRole('link')).toBeInTheDocument()
  expect(getByRole('link')).toHaveAttribute('href', '/')
})
