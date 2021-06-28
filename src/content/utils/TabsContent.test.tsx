import React from 'react'
import { render, screen } from '@testing-library/react'

import TabsContent from './TabsContent'

const getDupeItems = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => ({ content: <>.</>, title: '.', index: i }))

describe('check number of tablist, tab, and panels', () => {
  test.each([0, 3, 5])('test ', (n) => {
    render(<TabsContent storage={''} items={getDupeItems(n)} />)

    expect(screen.getAllByRole('tablist')).toHaveLength(1)
    expect(screen.queryAllByRole('tab')).toHaveLength(n)
    expect(screen.queryAllByRole('tabpanel')).toHaveLength(n > 0 ? 1 : 0) // display only 1 max at a time
  })
})

// test('cleanup function must be called once after unmount', () => {
//   const mockCleanup = jest.fn()
//   const { unmount } = render(<TabsContent storage={''} items={getDupeItems(2)} />)
//
//   expect(mockCleanup).not.toHaveBeenCalled()
//   unmount()
//   expect(mockCleanup).toHaveBeenCalledTimes(1)
// })

// test('update function must be called with tab index of pressed button', () => {
//   const numItems = 5
//   const mockUpdate = jest.fn()
//   render(<TabsContent storage={''} items={getDupeItems(numItems)} />)
//
//   for (let i = 0; i < numItems; i++) {
//     fireEvent(
//       screen.getAllByRole('tab')[i],
//       new MouseEvent('click', {
//         bubbles: true,
//       })
//     )
//     expect(mockUpdate).toHaveBeenLastCalledWith(i)
//   }
// })
