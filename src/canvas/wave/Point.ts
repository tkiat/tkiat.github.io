import {PointProps} from 'my-wave-type'

class Point {
  index: number

  x: number
  y: number
  initialY: number

  height: number
  speed: number
  shakiness: number

  constructor({height, index, speed, shakiness, x, y}: PointProps) {
    this.index = index

    this.x = x
    this.y = y
    this.initialY = y

    this.height = height
    this.speed = speed
    this.shakiness = shakiness
  }

  oscillate() {
    this.index += this.speed
    this.y = this.initialY + Math.sin(this.index) * this.height + Math.random() * this.shakiness
  }
}

export default Point
