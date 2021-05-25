export default class Point {
  constructor(index, x, y, height, speed, shakiness) {
    this.x = x
    this.y = y
    this.fixedY = y
    this.moveStep = 30
    this.newY = y
    this.cur = index

    this.height = height
    this.speed = speed
    this.shakiness = shakiness
  }

  oscillate() {
    this.cur += this.speed
    this.y = this.fixedY + Math.sin(this.cur) * this.height + Math.random() * this.shakiness
  }
//   move() {
//     if(this.fixedY !== this.newY) {
//       this.fixedY = (Math.abs(this.newY - this.fixedY) < this.moveStep) ? this.newY : this.fixedY + (this.fixedY < this.newY ? this.moveStep : -this.moveStep)
//     }
//   }
}
