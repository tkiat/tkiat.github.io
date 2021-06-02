import {PointArguments, PointReturn} from 'my-wave-type'

const point = (obj: PointArguments): PointReturn => {
  let _radian = obj.index
  let _y = obj.y

  return {
    oscillate: () => {
      _radian += obj.speed
      _y = obj.y + (Math.sin(_radian) * obj.height) + (Math.random() * obj.shakiness)
    },
    x: obj.x,
    getY: () => {
      return _y
    },
  }
}

export default point
