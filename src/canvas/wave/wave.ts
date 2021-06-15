import * as Wave from 'ts-type-wave'

import point from './point'

export default (obj: Wave.WaveProps): Wave.Wave => ({
  points: createPoints(obj),
})

const createPoints = ({ index, to, from, totalPoints }: Wave.WaveProps) => {
  const pointGapX = (to.x - from.x) / (totalPoints - 1)
  const pointGapY = (to.y - from.y) / (totalPoints - 1)

  return [...Array(totalPoints).keys()].reduce((points, cur) => {
    const coordinates = { x: from.x + pointGapX * cur, y: from.y + pointGapY * cur }
    return [
      ...points,
      point({
        index: index + cur,

        x: coordinates.x,
        y: coordinates.y,
      }),
    ]
  }, [] as Wave.Point[])
}
