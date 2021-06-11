declare module 'ts-type-canvas' {
  import React from 'react'

  import * as Theme from 'ts-type-theme'

  export type CanvasProps = {
    argumentCanvas: { height: number; width: number }
    argumentDrawCanvas: DrawCanvasProps
  }

  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<Theme.WaveColors>
    waveConfigs: Theme.WaveConfigs
    wavePhysics: React.MutableRefObject<Theme.WavePhysics>
  }
  export type DrawCanvas = React.Ref<HTMLCanvasElement> | undefined
}
