import React from 'react'
import { render, screen } from '@testing-library/react'

import Noob from './Noob'

describe('Noob', () => {
  test('renders Noob component', () => {
    // const { container, getByText } = render(<div>Hello World</div>)
    // render(<div>Hello World</div>)
    render(<Noob title="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    // screen.debug()
    // expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
