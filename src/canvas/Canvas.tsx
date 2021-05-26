import React from 'react'
import DrawCanvas from './DrawCanvas'

type CanvasProps = {
  argumentCanvas: {height: number, width: number},
  argumentDrawCanvas: any
}

const Canvas: React.FunctionComponent<CanvasProps> = ({argumentCanvas, argumentDrawCanvas}) => {
  const canvasRef = DrawCanvas(argumentDrawCanvas)
  return <canvas className='canvas' ref={canvasRef} {...argumentCanvas} role='img' />
}

export default Canvas
