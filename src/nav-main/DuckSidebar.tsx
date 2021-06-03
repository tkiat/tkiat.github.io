import React from 'react'
import {DuckSidebarProps} from 'my-duck-type'

import {ReactComponent as DuckSidebarSVG} from 'src/@global/asset/duck/duck-settings.svg'

const DuckSidebar = ({index, myId, text, onclick}: DuckSidebarProps): React.ReactElement => {
  const xOffset = '20px'
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  return (
    <button id={myId} className='duck duck--sidebar' aria-label={text} style={{left: left}} onClick={onclick}>
      <div className='duck__text'>{text}</div>
      <DuckSidebarSVG className='duck__svg' />
    </button>
  )
}

export default DuckSidebar
