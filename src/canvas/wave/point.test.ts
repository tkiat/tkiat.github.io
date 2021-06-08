import { PointArguments, Point } from 'my-wave-type'

import point from './point'

let pointProps: PointArguments, pointMock: Point

describe('test return values', () => {
  beforeAll(() => {
    pointProps = {
      index: 0,
      x: 100,
      y: 200,

      height: 10,
      speed: 1,
      shakiness: 0,
    }
    pointMock = point(pointProps)
  })

  test('check all return values before oscillating', () => {
    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).toBe(pointProps.y)
  })
  test('after oscillating once, only y position should not be the same', () => {
    pointMock.oscillate()

    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).not.toBe(pointProps.y)
  })
})
