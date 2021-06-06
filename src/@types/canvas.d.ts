declare module 'my-canvas-type' {
  import React from 'react'

  import { WavesColors, WavesConfigs, WavesPhysics } from 'my-theme-type'

  export type CanvasProps = {
    argumentCanvas: { height: number; width: number }
    argumentDrawCanvas: DrawCanvasProps
  }
  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<WavesColors>
    wavesConfig: WavesConfigs
    wavePhysics: WavesPhysics
  }
  export type DrawCanvasRender = React.LegacyRef<HTMLCanvasElement> | undefined
}
