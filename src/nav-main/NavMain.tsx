import React from 'react'

import { Level, NavMainProps, NavMainItemContentProps, NavMainItemSidebarProps } from 'my-nav-type'

import NavMainItemContent from './NavMainItemContent'
import NavMainItemSidebar from './NavMainItemSidebar'

const shapes: { [l in Level]: NavMainItemContentProps['shape'] } = {
  0: 'DuckAbout',
  1: 'DuckHobby',
  2: 'DuckResume',
}
const shapeSidebar: NavMainItemSidebarProps['shape'] = 'DuckSidebar'

const contentLevels: Level[] = [0, 1, 2]
const texts = ['About', 'Hobby', 'Resume', 'Settings']

const xOffset = '20px'
const left = (index: number) => `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)

const NavMain = ({ navMainIndex, onclick, urlAtIndex }: NavMainProps): React.ReactElement => {
  return (
    <>
      {contentLevels.map((level) => (
        <NavMainItemContent
          key={level}
          href={urlAtIndex[level]}
          isActive={navMainIndex === level}
          left={left(level)}
          onclick={onclick}
          shape={shapes[level]}
          text={texts[level]}
        />
      ))}
      <NavMainItemSidebar left={left(3)} shape={shapeSidebar} text={texts[3]} />
    </>
  )
}

export default NavMain
