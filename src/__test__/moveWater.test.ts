import { moveWater } from 'src/nav-sub/moveWater'

import { Even } from 'my-math-type'

test('with invalid inputs, do nothing and return zero', () => {
  expect(moveWater(2 as Even, 2 as Even, 0)).toBe(0)
  expect(moveWater(-1 as Even, 2 as Even, 0)).toBe(0)
  expect(moveWater(2 as Even, -1 as Even, 0)).toBe(0)
})
