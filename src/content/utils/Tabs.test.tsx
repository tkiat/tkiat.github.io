import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Tabs from './Tabs'

const cleanup = () => {}
const update = () => {}
const getDupeItems = (n: number) => Array(n).fill({ content: <>.</>, title: '.' })

describe('check number of tablist, tab, and panels', () => {
  test.each([0, 3, 5])('test ', (n) => {
    render(<Tabs initIndex={0} cleanup={cleanup} update={update} items={getDupeItems(n)} />)

    expect(screen.getAllByRole('tablist')).toHaveLength(1)
    expect(screen.queryAllByRole('tab')).toHaveLength(n)
    expect(screen.queryAllByRole('tabpanel')).toHaveLength(n > 0 ? 1 : 0) // display only 1 max at a time
  })
})

test('cleanup function must be called once after unmount', () => {
  const mockCleanup = jest.fn()
  const { unmount } = render(<Tabs initIndex={0} cleanup={mockCleanup} update={update} items={getDupeItems(2)} />)

  expect(mockCleanup).not.toHaveBeenCalled()
  unmount()
  expect(mockCleanup).toHaveBeenCalledTimes(1)
})

test('update function must be called with tab index of pressed button', () => {
  const numItems = 5
  const mockUpdate = jest.fn()
  render(<Tabs initIndex={0} cleanup={cleanup} update={mockUpdate} items={getDupeItems(numItems)} />)

  for (let i = 0; i < numItems; i++) {
    fireEvent(
      screen.getAllByRole('tab')[i],
      new MouseEvent('click', {
        bubbles: true,
      })
    )
    expect(mockUpdate).toHaveBeenLastCalledWith(i)
  }
})
