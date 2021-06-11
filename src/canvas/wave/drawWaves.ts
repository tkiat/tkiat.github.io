import { WaveColors, WavePhysics } from 'my-theme-type'
import { Wave } from 'my-wave-type'

export const drawWaves = (ctx: CanvasRenderingContext2D, waves: Wave[], colors: WaveColors, physics: WavePhysics) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  waves.forEach((wave, i: number) => {
    drawWave(ctx, wave, colors[colors.length - 1 - i], physics)
  })
}

const drawWave = (ctx: CanvasRenderingContext2D, wave: Wave, fillColor: string, physics: WavePhysics) => {
  let prevX = wave.points[0].x
  let prevY = wave.points[0].getY()

  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.moveTo(prevX, prevY)

  for (let i = 0; i < wave.points.length; i++) {
    wave.points[i].oscillate(physics.height, physics.speed, physics.shakiness)

    const cx = (prevX + wave.points[i].x) / 2
    const cy = (prevY + wave.points[i].getY()) / 2
    ctx.quadraticCurveTo(prevX, prevY, cx, cy)

    prevX = wave.points[i].x
    prevY = wave.points[i].getY()
  }
  ctx.lineTo(prevX, prevY)
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
  ctx.lineTo(wave.points[0].x, ctx.canvas.height)
  ctx.lineTo(wave.points[0].x, wave.points[0].getY())

  ctx.fill()
  ctx.closePath()
}
