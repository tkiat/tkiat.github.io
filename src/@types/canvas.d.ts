declare module 'my-canvas-type' {
  import React from 'react'

  import * as Theme from 'my-theme-type'

  export type CanvasProps = {
    argumentCanvas: { height: number; width: number }
    argumentDrawCanvas: DrawCanvasProps
  }
  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<Theme.WaveColors>
    waveConfigs: Theme.WaveConfigs
    wavePhysics: React.MutableRefObject<Theme.WavePhysics>
  }
  export type DrawCanvasRender = React.LegacyRef<HTMLCanvasElement> | undefined
}
