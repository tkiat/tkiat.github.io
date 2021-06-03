import React from 'react'

import {NavMainItemSidebarProps} from 'my-nav-type'

import toggleSidebar from 'src/@global/toggleSidebar'

import {ReactComponent as DuckSidebarSVG} from 'src/@global/asset/duck/duck-settings.svg'

const DuckSidebar = ({index, text}: NavMainItemSidebarProps): React.ReactElement => {
  const xOffset = '20px'
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  return (
    <button id='duck-sidebar' className='duck duck--sidebar' aria-label={text} style={{left: left}} onClick={toggleSidebar}>
      <div className='duck__text'>{text}</div>
      <DuckSidebarSVG className='duck__svg' />
    </button>
  )
}

export default DuckSidebar
