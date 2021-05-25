import React from 'react'
import {ReactComponent as DuckSidebarSVG} from './svg/duck-settings.svg'

const DuckSidebar = props => {
  const xOffset = '20px'
  // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${props.index} + 1) / 8 - ${xOffset})`
  return (
    <button id={props.myId} className='duck duck--sidebar' aria-label={props.text} style={{left: left}} onClick={props.toggleSidebar}>
      <div className='duck__text'>{props.text}</div>
      <DuckSidebarSVG className='duck__svg' />
    </button>
  )
}

export default DuckSidebar
