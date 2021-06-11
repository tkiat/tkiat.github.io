import React from 'react'
import * as Canvas from 'ts-type-canvas'

import DrawCanvas from './DrawCanvas'

const CanvasComponent = ({ argumentCanvas, argumentDrawCanvas }: Canvas.CanvasProps): React.ReactElement => {
  const canvasRef = DrawCanvas(argumentDrawCanvas)
  return <canvas className="canvas" ref={canvasRef} {...argumentCanvas} role="img" />
}

export default CanvasComponent
