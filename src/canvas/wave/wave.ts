import * as Wave from 'ts-type-wave'

import point from './point'

export default (inputs: Wave.WaveProps): Wave.Wave => ({
  points: createPoints(inputs),
})

const createPoints = ({ index, to, from, totalPoints }: Wave.WaveProps) => {
  const pointGapX = (to.x - from.x) / (totalPoints - 1)
  const pointGapY = (to.y - from.y) / (totalPoints - 1)

  return [...Array(totalPoints).keys()].reduce(
    (points, cur) => [
      ...points,
      point({
        index: index + cur,

        x: from.x + pointGapX * cur,
        y: from.y + pointGapY * cur,
      }),
    ],
    [] as Wave.Point[]
  )
}
