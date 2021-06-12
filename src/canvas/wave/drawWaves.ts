import * as Theme from 'ts-type-theme'
import { Wave } from 'ts-type-wave'
import { Coordinate, Dimension, Line } from 'ts-type-util'

export const drawWaves = (
  ctx: CanvasRenderingContext2D,
  waves: Wave[],
  colors: Theme.WaveColors,
  physics: Theme.WavePhysics
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const canvasDim = { w: ctx.canvas.width, h: ctx.canvas.height }
  waves.forEach((wave, i: number) => {
    const { curves, lines } = getTrajectory(wave, physics, canvasDim)
    drawWave(ctx, colors[colors.length - 1 - i], curves, lines)
  })
}

const getTrajectory = (wave: Wave, physics: Theme.WavePhysics, canvasDim: Dimension) => {
  let curves = []
  let lines = []

  wave.points[0].oscillate(physics.height, physics.speed, physics.shakiness)

  let prevX = wave.points[0].x
  let prevY = wave.points[0].getY()

  let cx, cy

  for (let i = 1; i < wave.points.length; i++) {
    wave.points[i].oscillate(physics.height, physics.speed, physics.shakiness)

    cx = (prevX + wave.points[i].x) / 2
    cy = (prevY + wave.points[i].getY()) / 2
    curves.push({ from: { x: prevX, y: prevY }, to: { x: cx, y: cy } })

    prevX = wave.points[i].x
    prevY = wave.points[i].getY()
  }
  lines.push({ x: prevX, y: prevY })
  lines.push({ x: canvasDim.w, y: canvasDim.h })
  lines.push({ x: wave.points[0].x, y: canvasDim.h })

  return { curves, lines }
}

const drawWave = (ctx: CanvasRenderingContext2D, fillColor: string, curves: Line[], lines: Coordinate[]) => {
  ctx.beginPath()
  ctx.fillStyle = fillColor
  ctx.moveTo(curves[0].from.x, curves[0].from.y)

  for (let i = 0; i < curves.length; i++) {
    ctx.quadraticCurveTo(curves[i].from.x, curves[i].from.y, curves[i].to.x, curves[i].to.y)
  }
  for (let i = 0; i < lines.length; i++) {
    ctx.lineTo(lines[i].x, lines[i].y)
  }

  ctx.fill()
  ctx.closePath()
}
