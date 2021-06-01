import {PointReturn, WaveArguments, WaveReturn} from 'my-wave-type'

import Point from './Point'

const Wave = (obj: WaveArguments): WaveReturn => {
  let points: PointReturn[] = []

  const computeCoordinates = () => {
    const pointGapX = (obj.to.x - obj.from.x) / (obj.totalPoints - 1)
    const pointGapY = (obj.to.y - obj.from.y) / (obj.totalPoints - 1)
    let coordinates = []
    for (let i = 0; i < obj.totalPoints; i++) {
      coordinates[i] = {x: obj.from.x + pointGapX * i, y: obj.from.y + pointGapY * i}
    }
    return coordinates
  }

  const createPoints = () => {
    let coordinates = computeCoordinates()
    for (let i = 0; i < obj.totalPoints; i++) {
      points[i] = Point({
        index: obj.index + i,

        x: coordinates[i].x,
        y: coordinates[i].y,

        height: obj.height,
        speed: obj.speed,
        shakiness: obj.shakiness
      })
    }
  }

  createPoints()

  return {
    points,
  }
}

export default Wave
