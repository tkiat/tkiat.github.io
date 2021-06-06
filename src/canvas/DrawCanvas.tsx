import { useEffect, useRef } from 'react'

import { DrawCanvasProps, DrawCanvasRender } from 'my-canvas-type'

import { drawWaves } from './wave/drawWaves'
import { moveItemsAlongWave } from './wave/moveItemsAlongWave'

import wave from './wave/wave'

const DrawCanvas = ({ wavesConfig, waveColors, wavePhysics }: DrawCanvasProps): DrawCanvasRender => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const context = canvas.getContext('2d')
    if (!context) return

    const waves = [...Array(wavesConfig.num).keys()].map((i) => {
      return wave({
        index: i,

        from: wavesConfig.from,
        to: wavesConfig.to,
        totalPoints: wavesConfig.totalPoints,

        height: wavePhysics.height,
        speed: wavePhysics.speed,
        shakiness: wavePhysics.shakiness,
      })
    })

    const navMainItems = document.body.querySelectorAll('.nav-main') as NodeListOf<HTMLElement>
    const creatureOffset = 20
    let animationFrameId: number

    const render = () => {
      drawWaves(context, waves, waveColors.current)
      moveItemsAlongWave(navMainItems, waves[waves.length - 1], creatureOffset)
      animationFrameId = window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
    // eslint-disable-next-line
  }, [wavesConfig, wavePhysics])

  return canvasRef
}

export default DrawCanvas
