declare module 'my-canvas-type' {
  import React from 'react'

  import { WaveColors, WaveConfigs, WavePhysics } from 'my-theme-type'

  export type CanvasProps = {
    argumentCanvas: { height: number; width: number }
    argumentDrawCanvas: DrawCanvasProps
  }
  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<WaveColors>
    waveConfigs: WaveConfigs
    wavePhysics: React.MutableRefObject<WavePhysics>
  }
  export type DrawCanvasRender = React.LegacyRef<HTMLCanvasElement> | undefined
}
