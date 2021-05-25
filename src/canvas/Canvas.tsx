import React from 'react'
import DrawCanvas from './DrawCanvas'

const Canvas = (props: any) => {

  const canvasRef = DrawCanvas(props.argumentDrawCanvas)

  return <canvas className={props.className} ref={canvasRef} {...props.argumentCanvas}/>
}

export default Canvas
