import React from 'react'
import { CanvasProps } from 'my-canvas-type'

import DrawCanvas from './DrawCanvas'

const Canvas = ({ argumentCanvas, argumentDrawCanvas }: CanvasProps): React.ReactElement => {
  const canvasRef = DrawCanvas(argumentDrawCanvas)
  return <canvas className="canvas" ref={canvasRef} {...argumentCanvas} role="img" />
}

export default Canvas
