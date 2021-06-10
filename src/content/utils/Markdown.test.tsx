import React from 'react'
import { render, screen } from '@testing-library/react'

import Markdown from './Markdown'

test('render nothing with invalid props #1', () => {
  const content = '# This should be rendered as heading element'
  render(<Markdown content={content} />)
  expect(screen.getByRole('heading')).toHaveTextContent(content.slice(2))
})
