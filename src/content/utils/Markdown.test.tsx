import React from 'react'
import { render } from '@testing-library/react'

import Markdown from './Markdown'

test('render nothing with invalid props #1', () => {
  const content = '# This should be rendered as heading element'
  const { getByRole } = render(<Markdown content={content} />)
  expect(getByRole('heading')).toHaveTextContent(content.slice(2))
})
