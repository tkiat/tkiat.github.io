import { Status } from 'ts-type-util'
import { Point, Wave } from 'ts-type-wave'

// const avg = (a: number) => (b: number) => (a + b) / 2
// const radToDeg = (rad: number) => (rad * 180) / Math.PI
//
// const radPoints = (pL: Point) => (pR: Point) => Math.atan2(pR.getY() - pL.getY(), pR.x - pL.x)
//
// const getMidYPoints = (p1: Point) => (p2: Point) => avg(p1.getY())(p2.getY())
// const getMidDegPoints = (left: Point) => (right: Point) => radToDeg(radPoints(left)(right))

const getMidpointY = (p1: Point, p2: Point) => (p1.getY() + p2.getY()) / 2
const getMidpointDeg = (left: Point, right: Point) =>
  (Math.atan2(right.getY() - left.getY(), right.x - left.x) * 180) / Math.PI

export default (items: NodeListOf<HTMLElement>, wave: Wave, offset: number): Status => {
  if (items.length >= wave.points.length) return 1
  const points = wave.points.slice(0, items.length + 1)

  const offsetY = points.flatMap((_, i, arr) => (i < items.length ? getMidpointY(arr[i], arr[i + 1]) : []))
  const offsetYadjust = offsetY.map((x, i) => x - items[i].clientHeight + offset + 'px')
  const offsetDeg = points.flatMap((_, i, arr) => (i < items.length ? getMidpointDeg(arr[i], arr[i + 1]) : []))

  Array.prototype.map.call(items, (item, i) => {
    item.style.transform = `translateY(${offsetYadjust[i]}) rotate(${offsetDeg[i]}deg)`
    return item
  })
  return 0
}
