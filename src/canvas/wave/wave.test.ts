import point from 'src/canvas/wave/point'
import wave from './wave'

test('check all points on wave after creation', () => {
  const waveProps = {
    index: 0,
    from: { x: 0, y: 600 },
    to: { x: 1280, y: 600 },
    totalPoints: 5,
  }
  const waveMock = wave(waveProps)
  const expectedPoint = (x: number) =>
    JSON.stringify(
      point({
        index: waveProps.index + 0,

        x: x,
        y: 600,
      })
    )
  for (let i = 0; i < waveMock.points.length; i++) {
    // Jest cannot compare functions directly, need to convert to string
    expect(JSON.stringify(waveMock.points[i])).toStrictEqual(expectedPoint([0, 320, 640, 960, 1280][i]))
  }
})
