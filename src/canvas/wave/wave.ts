import { Point, WaveArguments, Wave } from 'my-wave-type'
import { Coordinate } from 'my-util-type'

import point from './point'

const computeCoordinates = (to: Coordinate, from: Coordinate, totalPoints: number) => {
  const pointGapX = (to.x - from.x) / (totalPoints - 1)
  const pointGapY = (to.y - from.y) / (totalPoints - 1)
  let coordinates = []
  for (let i = 0; i < totalPoints; i++) {
    coordinates[i] = { x: from.x + pointGapX * i, y: from.y + pointGapY * i }
  }
  return coordinates
}
const createPoints = (index: number, coordinates: Coordinate[]) => {
  let points: Point[] = []

  for (let i = 0; i < coordinates.length; i++) {
    points[i] = point({
      index: index + i,

      x: coordinates[i].x,
      y: coordinates[i].y,
    })
  }
  return points
}

const wave = (obj: WaveArguments): Wave => {
  let _coordinates = computeCoordinates(obj.to, obj.from, obj.totalPoints)
  return {
    points: createPoints(obj.index, _coordinates),
  }
}

export default wave
