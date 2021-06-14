import React from 'react'
import { NavMainItemSidebarShape } from 'ts-type-nav'

import toggleSidebar from 'src/@global/toggleSidebar'
import { ReactComponent as DuckSidebarSVG } from 'src/@global/asset/duck/duck-settings.svg'

type Props = {
  left: string
  shape: NavMainItemSidebarShape
  text: string
}

export default ({ left, text }: Props): React.ReactElement => {
  return (
    <button
      id="nav-main-sidebar"
      className="nav-main nav-main--sidebar"
      aria-label={text}
      style={{ left: left }}
      onClick={toggleSidebar}>
      <div className="nav-main__text">{text}</div>
      <DuckSidebarSVG className="nav-main__svg" />
    </button>
  )
}
