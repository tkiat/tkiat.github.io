import {useEffect, useRef} from 'react'
import {DrawCanvasProps, DrawCanvasOutput} from 'my-canvas-type'

import {drawWaves}          from './wave/drawWaves'
import {moveDucksAlongWave} from './moveDucksAlongWave'
import Wave                 from './wave/Wave'

const DrawCanvas = ({wavesConfig, waveColors}: DrawCanvasProps): DrawCanvasOutput => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(!canvasRef.current) return
    const canvas = canvasRef.current

    const context = canvas.getContext('2d')
    if(!context) return

    const config = {
      from: wavesConfig.from,
      to: wavesConfig.to,
      totalPoints: wavesConfig.totalPoints,
      height: wavesConfig.height,
      speed: wavesConfig.speed,
      shakiness: wavesConfig.shakiness,
    }
    const waves = [...Array(wavesConfig.num).keys()].map(i => {
      return new Wave({index: i, ...config })
    })

    const ducks = document.getElementsByClassName('duck') as HTMLCollectionOf<HTMLElement>
    const creatureOffset = 20
    let animationFrameId: number

    const render = () => {
      drawWaves(context, waves, waveColors.current)
      moveDucksAlongWave(ducks, waves[waves.length - 1], creatureOffset)
      animationFrameId = window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  // eslint-disable-next-line
  }, [wavesConfig])

  return canvasRef
}

export default DrawCanvas
