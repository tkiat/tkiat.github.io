import React from 'react'
import { render } from '@testing-library/react'

import Title from './Title'

describe('render nothing with invalid props', () => {
  test('render nothing with invalid props #1', () => {
    const { container } = render(<Title items={['']} navSubIndex={null} navMainIndex={0} />)
    expect(container).toBeEmptyDOMElement()
  })
  test('render nothing with invalid props #2', () => {
    const { container } = render(<Title items={['/item1', '/item2']} navSubIndex={2} navMainIndex={0} />)
    expect(container).toBeEmptyDOMElement()
  })
})

test('render something with valid props', () => {
  const { container } = render(<Title items={['/item1', '/item2']} navSubIndex={1} navMainIndex={0} />)
  expect(container).not.toBeEmptyDOMElement()
})

test('strip url successfully with valid props', () => {
  const { getByText, queryByText } = render(<Title items={['/item1', '/item2']} navSubIndex={1} navMainIndex={0} />)
  expect(getByText('item2')).toBeInTheDocument()
  expect(queryByText('/item2')).not.toBeInTheDocument()
})
