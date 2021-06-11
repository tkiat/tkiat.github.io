import * as Wave from 'ts-type-wave'

import point from './point'

let pointProps: Wave.PointArguments, pointMock: Wave.Point

describe('test return values', () => {
  beforeAll(() => {
    pointProps = {
      index: 0,
      x: 100,
      y: 200,
    }
    pointMock = point(pointProps)
  })

  test('check all return values before oscillating', () => {
    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).toBe(pointProps.y)
  })
  test('after oscillating once, only y position should not be the same', () => {
    pointMock.oscillate(10, 1, 0)

    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).not.toBe(pointProps.y)
  })
})
