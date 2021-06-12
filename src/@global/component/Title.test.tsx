import React from 'react'
import { render } from '@testing-library/react'

import Title from './Title'

test('render something with valid props', () => {
  const { container } = render(<Title className="test" title="/title1" />)
  expect(container).not.toBeEmptyDOMElement()
})
