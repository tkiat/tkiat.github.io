import * as Wave from 'ts-type-wave'

const point = (obj: Wave.PointArguments): Wave.Point => {
  let _radian = obj.index
  let _y = obj.y

  return {
    oscillate: (height, speed, shakiness) => {
      _radian += speed
      _y = obj.y + Math.sin(_radian) * height + Math.random() * shakiness
    },
    x: obj.x,
    getY: () => {
      return _y
    },
  }
}

export default point
