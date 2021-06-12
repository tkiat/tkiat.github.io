import React from 'react'
import * as Canvas from 'ts-type-canvas'

import DrawCanvas from './DrawCanvas'

const CanvasComponent = ({ argumentCanvas, argumentDrawCanvas }: Canvas.CanvasProps): React.ReactElement => {
  const { w, h } = argumentCanvas
  const canvasRef = DrawCanvas(argumentDrawCanvas)
  return <canvas className="canvas" ref={canvasRef} width={w} height={h} role="img" />
}

export default CanvasComponent
