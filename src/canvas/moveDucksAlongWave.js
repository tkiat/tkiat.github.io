export const moveDucksAlongWave = (ducks, wave, offset) => {
  if(ducks.length >= wave.points.length) return
  for (let i = 0; i < ducks.length; i++) {
    const midpoint = (wave.points[i].y + wave.points[i+1].y)/2
    const offsetY = (midpoint - ducks[i].clientHeight + offset) + 'px'
    const offsetDeg = Math.atan2(wave.points[i+1].y - wave.points[i].y, wave.points[i+1].x - wave.points[i].x) * 180 / Math.PI
    ducks[i].style.transform = `translateY(${offsetY}) rotate(${offsetDeg}deg)`
  }
}
