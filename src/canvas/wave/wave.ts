import {Coordinate, PointReturn, WaveArguments, WaveReturn} from 'my-wave-type'

import point from './point'

const computeCoordinates = (to: Coordinate, from: Coordinate, totalPoints: number) => {
  const pointGapX = (to.x - from.x) / (totalPoints - 1)
  const pointGapY = (to.y - from.y) / (totalPoints - 1)
  let coordinates = []
  for (let i = 0; i < totalPoints; i++) {
    coordinates[i] = {x: from.x + pointGapX * i, y: from.y + pointGapY * i}
  }
  return coordinates
}
const createPoints = (index: number, coordinates: Coordinate[], height: number, speed: number, shakiness: number) => {
  let points: PointReturn[] = []

  for (let i = 0; i < coordinates.length; i++) {
    points[i] = point({
      index: index + i,

      x: coordinates[i].x,
      y: coordinates[i].y,

      height: height,
      speed: speed,
      shakiness: shakiness
    })
  }
  return points
}

const wave = (obj: WaveArguments): WaveReturn => {
  let _coordinates = computeCoordinates(obj.to, obj.from, obj.totalPoints)
  return {
    points: createPoints(obj.index, _coordinates, obj.height, obj.speed, obj.shakiness),
  }
}

export default wave
