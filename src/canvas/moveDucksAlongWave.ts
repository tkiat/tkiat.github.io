import {WaveReturn} from 'my-wave-type'

export const moveDucksAlongWave = (ducks: NodeListOf<HTMLElement>, wave: WaveReturn, offset: number) => {
  if(ducks.length >= wave.points.length) return
  for (let i = 0; i < ducks.length; i++) {
    const midpoint = (wave.points[i].getY() + wave.points[i+1].getY())/2
    const offsetY = (midpoint - ducks[i].clientHeight + offset) + 'px'
    const offsetDeg = Math.atan2(wave.points[i+1].getY() - wave.points[i].getY(), wave.points[i+1].x - wave.points[i].x) * 180 / Math.PI
    ducks[i].style.transform = `translateY(${offsetY}) rotate(${offsetDeg}deg)`
  }
}
