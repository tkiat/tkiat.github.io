import {WavesColors} from 'my-wave-config-type'

import Point from './Point'
import Wave  from './Wave'

export const drawWaves = (ctx: CanvasRenderingContext2D, waves: Wave[], colors: WavesColors) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  waves.forEach((wave, i: number) => {
    drawWave(ctx, wave, colors[colors.length - 1 - i])
  })
}

const drawWave = (ctx: CanvasRenderingContext2D, wave: Wave, fillColor: string) => {
  let prevX = wave.points[0].x
  let prevY = wave.points[0].y

  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.moveTo(prevX, prevY)

  for (let i = 0; i < wave.points.length; i++) {
    (wave.points[i] as Point).oscillate()

    const cx = (prevX + wave.points[i].x) / 2
    const cy = (prevY + wave.points[i].y) / 2
    ctx.quadraticCurveTo(prevX, prevY, cx, cy)

    prevX = wave.points[i].x
    prevY = wave.points[i].y
  }
  ctx.lineTo(prevX, prevY)
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
  ctx.lineTo(wave.points[0].x, ctx.canvas.height)
  ctx.fill()
  ctx.closePath()
}
