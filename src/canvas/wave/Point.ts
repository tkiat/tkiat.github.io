import {PointInputs, PointOutputs} from 'my-wave-type'

function Point(obj: PointInputs): PointOutputs {
  let radian = obj.index
  let yCur = obj.y

  return {
    oscillate: () => {
      radian += obj.speed
      yCur = obj.y + (Math.sin(radian) * obj.height) + (Math.random() * obj.shakiness)
    },
    x: obj.x,
    getY: () => {
      return yCur
    },
  }
}

export default Point
