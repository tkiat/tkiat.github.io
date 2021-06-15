import * as Theme from 'ts-type-theme'
import { Wave } from 'ts-type-wave'
import * as Util from 'ts-type-util'

export const drawWaves = (
  ctx: CanvasRenderingContext2D,
  waves: Wave[],
  colors: Theme.WaveColors,
  physics: Theme.WavePhysics
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const canvasDim = { w: ctx.canvas.width, h: ctx.canvas.height }
  waves.map((wave, i) => {
    const { curves, lines } = getTrajectory(wave, physics, canvasDim)
    drawWave(ctx, colors[colors.length - 1 - i], curves, lines)
  })
}

const getTrajectory = (wave: Wave, physics: Theme.WavePhysics, canvasDim: Util.Dimension) => {
  let curves: Util.Line[] = []
  let lines = []

  wave.points[0].oscillate(physics.height, physics.speed, physics.shakiness)

  let prevX = wave.points[0].x
  let prevY = wave.points[0].getY()

  let cx, cy

  wave.points.slice(1).map((point) => {
    point.oscillate(physics.height, physics.speed, physics.shakiness)

    cx = (prevX + point.x) / 2
    cy = (prevY + point.getY()) / 2
    curves.push({ from: { x: prevX, y: prevY }, to: { x: cx, y: cy } })

    prevX = point.x
    prevY = point.getY()
  })

  lines.push({ x: prevX, y: prevY })
  lines.push({ x: canvasDim.w, y: canvasDim.h })
  lines.push({ x: wave.points[0].x, y: canvasDim.h })

  return { curves, lines }
}

const drawWave = (ctx: CanvasRenderingContext2D, fillColor: string, curves: Util.Line[], lines: Util.Coordinate[]) => {
  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.moveTo(curves[0].from.x, curves[0].from.y)

  curves.map((curve) => ctx.quadraticCurveTo(curve.from.x, curve.from.y, curve.to.x, curve.to.y))
  lines.map((line) => ctx.lineTo(line.x, line.y))

  ctx.fill()
  ctx.closePath()
}
