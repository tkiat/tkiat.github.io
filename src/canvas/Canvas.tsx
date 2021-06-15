import React from 'react'
import * as Theme from 'ts-type-theme'
import { Dimension } from 'ts-type-util'

import DrawCanvas from './DrawCanvas'

type Props = {
  argumentCanvas: Dimension
  argumentDrawCanvas: {
    waveColors: React.MutableRefObject<Theme.WaveColors>
    waveConfigs: Theme.WaveConfigs
    wavePhysics: React.MutableRefObject<Theme.WavePhysics>
  }
}

export default ({ argumentCanvas, argumentDrawCanvas }: Props): React.ReactElement => {
  const { w, h } = argumentCanvas
  const canvasRef = DrawCanvas(argumentDrawCanvas)
  return <canvas className="canvas" ref={canvasRef} width={w} height={h} role="img" />
}
