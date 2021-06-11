import { useEffect, useRef } from 'react'

import * as Canvas from 'ts-type-canvas'

import { drawWaves } from './wave/drawWaves'
import { moveItemsAlongWave } from './wave/moveItemsAlongWave'

import wave from './wave/wave'

const DrawCanvas = ({ waveConfigs, waveColors, wavePhysics }: Canvas.DrawCanvasProps): Canvas.DrawCanvas => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const context = canvas.getContext('2d')
    if (!context) return

    const waves = [...Array(waveConfigs.num).keys()].map((i) => {
      return wave({
        index: i,

        from: waveConfigs.from,
        to: waveConfigs.to,
        totalPoints: waveConfigs.totalPoints,
      })
    })

    const navMainItems = document.body.querySelectorAll('.nav-main') as NodeListOf<HTMLElement>
    const creatureOffset = 20
    let animationFrameId: number

    const render = () => {
      drawWaves(context, waves, waveColors.current, wavePhysics.current)
      moveItemsAlongWave(navMainItems, waves[waves.length - 1], creatureOffset)
      animationFrameId = window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
    // eslint-disable-next-line
  }, [waveConfigs])

  return canvasRef
}

export default DrawCanvas
