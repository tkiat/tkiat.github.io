import React from 'react'

import { NavMainIndex, NavMainProps, NavMainItemContentProps, NavMainItemSidebarProps } from 'my-nav-type'

import NavMainItemContent from './NavMainItemContent'
import NavMainItemSidebar from './NavMainItemSidebar'

const shapes: { [l in NavMainIndex]: NavMainItemContentProps['shape'] } = {
  0: 'DuckAbout',
  1: 'DuckHobby',
  2: 'DuckResume',
}
const shapeSidebar: NavMainItemSidebarProps['shape'] = 'DuckSidebar'

const navMainIndexes: NavMainIndex[] = [0, 1, 2]
const texts = ['About', 'Hobby', 'Resume', 'Settings']

const xOffset = '20px'
const left = (index: number) => `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)

const NavMain = ({ navMainIndex, rerender, urlAtIndex }: NavMainProps): React.ReactElement => {
  return (
    <>
      {navMainIndexes.map((index) => (
        <NavMainItemContent
          key={index}
          href={urlAtIndex[index]}
          isActive={navMainIndex.current === index}
          left={left(index)}
          onclick={() => {
            navMainIndex.current = index
            rerender()
          }}
          shape={shapes[index]}
          text={texts[index]}
        />
      ))}
      <NavMainItemSidebar left={left(3)} shape={shapeSidebar} text={texts[3]} />
    </>
  )
}

export default NavMain
