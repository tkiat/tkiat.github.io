declare module 'my-canvas-type' {
  import React from 'react'
  import {WavesColors, WavesConfigs} from 'my-wave-config-type'

  export type CanvasProps = {
    argumentCanvas: {height: number, width: number},
    argumentDrawCanvas: DrawCanvasProps,
  }
  export type DrawCanvasProps = {
    waveColors: React.MutableRefObject<WavesColors>,
    wavesConfig: WavesConfigs,
  }
  export type DrawCanvasRender = React.LegacyRef<HTMLCanvasElement> | undefined
}
