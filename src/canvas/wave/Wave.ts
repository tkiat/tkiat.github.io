import Point from './Point'

export default class Wave {
  constructor(index, totalPoints, from, to, height, speed, shakiness) {
    this.index = index
    this.points = []
    this.totalPoints = totalPoints
    this.from = from
    this.to = to

    this.height = height
    this.speed = speed
    this.shakiness = shakiness

    this.createPoints()
  }

  createPoints() {
    let coordinates = this.computeCoordinates()
    for (let i = 0; i < this.totalPoints; i++) {
      this.points[i] = new Point(this.index + i, coordinates[i].x, coordinates[i].y, this.height, this.speed, this.shakiness)
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
