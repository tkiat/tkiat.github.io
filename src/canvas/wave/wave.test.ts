import point from 'src/canvas/wave/point'
import wave from 'src/canvas/wave/wave'

test('check all points on wave after creation', () => {
  const waveProps = {
    from: { x: 0, y: 600 },
    to: { x: 1280, y: 600 },
    shakiness: 0,
    index: 0,
    totalPoints: 5,
    height: 10,
    speed: 1,
  }
  const waveMock = wave(waveProps)
  const expectedPoint = (x: number) =>
    JSON.stringify(
      point({
        index: waveProps.index + 0,

        x: x,
        y: 600,

        height: waveProps.height,
        speed: waveProps.speed,
        shakiness: waveProps.shakiness,
      })
    )
  for (let i = 0; i < waveMock.points.length; i++) {
    // Jest cannot compare functions directly, need to convert to string
    expect(JSON.stringify(waveMock.points[i])).toStrictEqual(expectedPoint([0, 320, 640, 960, 1280][i]))
  }
})
