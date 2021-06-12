declare module 'ts-type-canvas' {
  import React from 'react'

  import * as Theme from 'ts-type-theme'
  import { Dimension } from 'ts-type-util'

  export type CanvasProps = {
    argumentCanvas: Dimension
    argumentDrawCanvas: DrawCanvasProps
  }

  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<Theme.WaveColors>
    waveConfigs: Theme.WaveConfigs
    wavePhysics: React.MutableRefObject<Theme.WavePhysics>
  }
  export type DrawCanvas = React.Ref<HTMLCanvasElement> | undefined
}
