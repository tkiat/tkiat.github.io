import { WaveArguments } from 'my-wave-type'

import { drawWaves } from 'src/canvas/wave/drawWaves'

import wave from 'src/canvas/wave/wave'

const waveProps = {
  from: { x: 0, y: 600 },
  to: { x: 1280, y: 600 },

  shakiness: 0,
}

const canvas = document.createElement('canvas')
canvas.height = 800
canvas.width = 1280
const context = canvas.getContext('2d')

test('test oscillated wave: index = 0 , totalPoints = 5, height = 10, speed = 1, red color', () => {
  const props = { ...waveProps, index: 0, totalPoints: 5, height: 10, speed: 1 }
  const waveMock = wave(props)
  if (context) drawWaves(context, [waveMock], ['red'])

  for (let i = 0; i < waveMock.points.length; i++) {
    const expectedVal = props.from.y + Math.sin(i + props.index + props.speed) * props.height
    expect(waveMock.points[i].getY()).toBeCloseTo(expectedVal, 3)
  }
  const lowerRightCanvasRGBA = context?.getImageData(context.canvas.width - 1, context.canvas.height - 1, 1, 1).data
  expect(Array.prototype.slice.call(lowerRightCanvasRGBA)).toStrictEqual([255, 0, 0, 255])
})

test('test oscillated wave: index = 1 , totalPoints = 3, height = 30, speed = 2, black color', () => {
  const props = { ...waveProps, index: 1, totalPoints: 3, height: 30, speed: 2 }
  const waveMock = wave(props)

  if (context) drawWaves(context, [waveMock], ['black'])

  for (let i = 0; i < waveMock.points.length; i++) {
    const expectedVal = props.from.y + Math.sin(i + props.index + props.speed) * props.height
    expect(waveMock.points[i].getY()).toBeCloseTo(expectedVal, 3)
  }
  const lowerRightCanvasRGBA = context?.getImageData(context.canvas.width - 1, context.canvas.height - 1, 1, 1).data
  expect(Array.prototype.slice.call(lowerRightCanvasRGBA)).toStrictEqual([0, 0, 0, 255])
})
