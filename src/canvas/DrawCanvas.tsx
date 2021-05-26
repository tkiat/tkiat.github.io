import {useEffect, useRef} from 'react'

import {drawWaves}          from './wave/drawWaves'
import {moveDucksAlongWave} from './moveDucksAlongWave'
import Wave                 from './wave/Wave'

// type Props = {
//   wavesConfig: any,
//   waveColors: any
// }

const DrawCanvas = (argument: any) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {wavesConfig, waveColors} = argument

  useEffect(() => {
    if(!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if(!context) return

    const waves = [...Array(wavesConfig.num).keys()].map(i => {
      return new Wave(i, wavesConfig.totalPoints, wavesConfig.from, wavesConfig.to, wavesConfig.height, wavesConfig.speed, wavesConfig.shakiness)
    })

    const ducks = document.getElementsByClassName('duck')
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
