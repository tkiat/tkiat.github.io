import {WaveOutputs} from 'my-wave-type'
import {WavesColors} from 'my-wave-config-type'

export const drawWaves = (ctx: CanvasRenderingContext2D, waves: WaveOutputs[], colors: WavesColors) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  waves.forEach((wave, i: number) => {
    drawWave(ctx, wave, colors[colors.length - 1 - i])
  })
}

const drawWave = (ctx: CanvasRenderingContext2D, wave: WaveOutputs, fillColor: string) => {
  let prevX = wave.points[0].x
  let prevY = wave.points[0].getY()

  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.moveTo(prevX, prevY)

  for (let i = 0; i < wave.points.length; i++) {
    wave.points[i].oscillate()

    const cx = (prevX + wave.points[i].x) / 2
    const cy = (prevY + wave.points[i].getY()) / 2
    ctx.quadraticCurveTo(prevX, prevY, cx, cy)

    prevX = wave.points[i].x
    prevY = wave.points[i].getY()
  }
  ctx.lineTo(prevX, prevY)
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
  ctx.lineTo(wave.points[0].x, ctx.canvas.height)
  ctx.fill()
  ctx.closePath()
}
