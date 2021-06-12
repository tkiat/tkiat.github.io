import React from 'react'

import * as Nav from 'ts-type-nav'

import NavMainItemContent from './NavMainItemContent'
import NavMainItemSidebar from './NavMainItemSidebar'
import { capitalize } from 'src/@global/utils'

const shapes: { [l in Nav.NavMainIndex]: Nav.NavMainItemContentProps['shape'] } = {
  0: 'DuckAbout',
  1: 'DuckHobby',
  2: 'DuckResume',
}
const shapeSidebar: Nav.NavMainItemSidebarProps['shape'] = 'DuckSidebar'

const navMainIndexes: Nav.NavMainIndex[] = [0, 1, 2]

const xOffset = '20px'
const left = (index: number) => `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)

const NavMain = ({ navMainIndexRef, rerender, urlAtIndex }: Nav.NavMainProps): React.ReactElement => {
  return (
    <>
      {navMainIndexes.map((index) => (
        <NavMainItemContent
          key={index}
          href={urlAtIndex[index]}
          isActive={navMainIndexRef.current === index}
          left={left(index)}
          onclick={() => {
            navMainIndexRef.current = index
            rerender()
          }}
          shape={shapes[index]}
          text={capitalize(urlAtIndex[index].slice(1))}
        />
      ))}
      <NavMainItemSidebar left={left(3)} shape={shapeSidebar} text="Settings" />
    </>
  )
}

export default NavMain
