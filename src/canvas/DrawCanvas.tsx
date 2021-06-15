import React from 'react'

import * as Theme from 'ts-type-theme'

import { drawWaves } from './wave/drawWaves'
import { moveItemsAlongWave } from './wave/moveItemsAlongWave'

import wave from './wave/wave'

type Props = {
  waveColors: React.MutableRefObject<Theme.WaveColors>
  waveConfigs: Theme.WaveConfigs
  wavePhysics: React.MutableRefObject<Theme.WavePhysics>
}
type Return = React.Ref<HTMLCanvasElement> | undefined

export default ({ waveConfigs, waveColors, wavePhysics }: Props): Return => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
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
  }, [waveConfigs])

  return canvasRef
}
