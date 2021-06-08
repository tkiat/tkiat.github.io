import React from 'react'
import { render } from '@testing-library/react'

import Contact from './Contact'

describe('return something with valid navMainIndexes', () => {
  test.each([0, 1])('navMainIndexes = %i', (i) => {
    const { container } = render(<Contact navMainIndex={i} />)
    expect(container).toBeEmptyDOMElement()
  })
})
describe('return something with invalid navMainIndexes', () => {
  test.each([2])('navMainIndexes = %i', (i) => {
    const { container } = render(<Contact navMainIndex={i} />)
    expect(container).not.toBeEmptyDOMElement()
  })
})
