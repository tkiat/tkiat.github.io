import { Status } from 'ts-type-util'
import { Wave } from 'ts-type-wave'

export const moveItemsAlongWave = (items: NodeListOf<HTMLElement>, wave: Wave, offset: number): Status => {
  if (items.length >= wave.points.length) return 1
  for (let i = 0; i < items.length; i++) {
    const midpoint = (wave.points[i].getY() + wave.points[i + 1].getY()) / 2
    const offsetY = midpoint - items[i].clientHeight + offset + 'px'
    const offsetDeg =
      (Math.atan2(wave.points[i + 1].getY() - wave.points[i].getY(), wave.points[i + 1].x - wave.points[i].x) * 180) /
      Math.PI
    items[i].style.transform = `translateY(${offsetY}) rotate(${offsetDeg}deg)`
  }
  return 0
}
