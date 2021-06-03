import React from 'react'

import {NavMainItemSidebarProps} from 'my-nav-type'

import toggleSidebar from 'src/@global/toggleSidebar'

import {ReactComponent as DuckSidebarSVG} from 'src/@global/asset/duck/duck-settings.svg'

const DuckSidebar = ({left, text}: NavMainItemSidebarProps): React.ReactElement => {
  return (
    <button id='duck-sidebar' className='nav-main nav-main--sidebar' aria-label={text} style={{left: left}} onClick={toggleSidebar}>
      <div className='nav-main__text'>{text}</div>
      <DuckSidebarSVG className='nav-main__svg' />
    </button>
  )
}

export default DuckSidebar
