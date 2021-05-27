import {Coordinate, PointProps, WaveProps} from 'my-wave-type'

import Point from './Point'

class Wave {
  index: number

  from: Coordinate
  to: Coordinate

  points: PointProps[]
  totalPoints: number

  height: number
  speed: number
  shakiness: number

  constructor({index, totalPoints, from, to, height, speed, shakiness}: WaveProps) {
    this.index = index

    this.from = from
    this.to = to

    this.points = []
    this.totalPoints = totalPoints

    this.height = height
    this.speed = speed
    this.shakiness = shakiness

    this.createPoints()
  }

  createPoints() {
    let coordinates = this.computeCoordinates()
    for (let i = 0; i < this.totalPoints; i++) {
      this.points[i] = new Point({
        index: this.index + i,

        x: coordinates[i].x,
        y: coordinates[i].y,

        height: this.height,
        speed: this.speed,
        shakiness: this.shakiness
      })
    }
  }

  computeCoordinates() {
    const pointGapX = (this.to.x - this.from.x) / (this.totalPoints - 1)
    const pointGapY = (this.to.y - this.from.y) / (this.totalPoints - 1)
    let coordinates = []
    for (let i = 0; i < this.totalPoints; i++) {
      coordinates[i] = {x: this.from.x + pointGapX * i, y: this.from.y + pointGapY * i}
    }
    return coordinates
  }
}

export default Wave
