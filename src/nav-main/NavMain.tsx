import React from 'react'

import {NavMainProps, NavMainItemContentShapes, NavMainItemSidebarShape} from 'my-nav-type'

import NavMainItemContent from './NavMainItemContent'
import NavMainItemSidebar from './NavMainItemSidebar'

const shapesContent: NavMainItemContentShapes[] = ['DuckAbout', 'DuckHobby', 'DuckResume']
const shapeSidebar: NavMainItemSidebarShape = 'DuckSidebar'
const texts = ['About', 'Hobby', 'Resume', 'Settings']

const NavMain = ({currentIndex, onclick, urlAtIndex}: NavMainProps): React.ReactElement => {
  return (
    <>
      {shapesContent.map((shape, index) =>
      <NavMainItemContent
        key={index}

        href={urlAtIndex[index]}
        index={index}
        isActive={currentIndex === index}
        onclick={onclick}
        shape={shape}
        text={texts[index]} />
      )}
      <NavMainItemSidebar
        index={3}
        shape={shapeSidebar}
        text={texts[3]} />
    </>
  )
}

export default NavMain
