import React from 'react'
import { render } from '@testing-library/react'

// import Noob from './Noob'

describe('Noob', () => {
  test('renders Noob component', () => {
    const { container, getByText } = render(<div>Hello World</div>)
    expect(getByText('Hello World')).toBeInTheDocument()
  })
})
