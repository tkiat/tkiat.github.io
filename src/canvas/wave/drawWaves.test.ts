import * as Theme from 'my-theme-type'
import { WaveArguments, Wave } from 'my-wave-type'

import { drawWaves } from './drawWaves'
import wave from 'src/canvas/wave/wave'

const canvas = document.createElement('canvas')
canvas.height = 800
canvas.width = 1280
const context = canvas.getContext('2d')

const wavePropsBase = {
  from: { x: 0, y: 600 },
  to: { x: 1280, y: 600 },
  shakiness: 0,
}
let waveColors: Theme.WaveColors
let wavePhysics: Theme.WavePhysics
let waveProps: WaveArguments
let wavesMock: Wave[]

describe('test 1: index = 0 , totalPoints = 5, height = 10, speed = 1, red color', () => {
  beforeAll(() => {
    waveColors = ['red']
    wavePhysics = { height: 10, speed: 1, shakiness: 0 }
    waveProps = { ...wavePropsBase, index: 0, totalPoints: 5 }
    wavesMock = [wave(waveProps)]

    if (context) drawWaves(context, wavesMock, waveColors, wavePhysics)
  })

  test('test y positions after oscillation', () => {
    for (let i = 0; i < wavesMock[0].points.length; i++) {
      const expectedVal =
        waveProps.from.y +
        Math.sin(i + waveProps.index + wavePhysics.speed) * wavePhysics.height +
        wavePhysics.shakiness
      expect(wavesMock[0].points[i].getY()).toBeCloseTo(expectedVal, 3)
    }
  })
  test('canvas fill color at lower-right corner should be red', () => {
    const lowerRightCanvasRGBA = context?.getImageData(context.canvas.width - 1, context.canvas.height - 1, 1, 1).data
    expect(Array.prototype.slice.call(lowerRightCanvasRGBA)).toStrictEqual([255, 0, 0, 255])
  })
})

describe('test 2: index = 1 , totalPoints = 3, height = 30, speed = 2, black color', () => {
  beforeAll(() => {
    waveColors = ['black']
    wavePhysics = { height: 30, speed: 2, shakiness: 0 }
    waveProps = { ...wavePropsBase, index: 1, totalPoints: 3, ...wavePhysics }
    wavesMock = [wave(waveProps)]

    if (context) drawWaves(context, wavesMock, waveColors, wavePhysics)
  })

  test('test y positions after oscillation', () => {
    for (let i = 0; i < wavesMock[0].points.length; i++) {
      const expectedVal =
        waveProps.from.y +
        Math.sin(i + waveProps.index + wavePhysics.speed) * wavePhysics.height +
        wavePhysics.shakiness
      expect(wavesMock[0].points[i].getY()).toBeCloseTo(expectedVal, 3)
    }
  })
  test('canvas fill color at lower-right corner should be black', () => {
    const lowerRightCanvasRGBA = context?.getImageData(context.canvas.width - 1, context.canvas.height - 1, 1, 1).data
    expect(Array.prototype.slice.call(lowerRightCanvasRGBA)).toStrictEqual([0, 0, 0, 255])
  })
})
