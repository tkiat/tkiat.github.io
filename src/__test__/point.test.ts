import { PointArguments, PointReturn } from 'my-wave-type'

import point from 'src/canvas/wave/point'

let pointProps: PointArguments, pointMock: PointReturn

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

  test('before oscillating', () => {
    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).toBe(pointProps.y)
  })
  test('after oscillating once', () => {
    pointMock.oscillate()

    expect(pointMock.x).toBe(pointProps.x)
    expect(pointMock.getY()).not.toBe(pointProps.y)
  })
})
