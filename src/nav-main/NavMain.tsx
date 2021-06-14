import React from 'react'

import * as Nav from 'ts-type-nav'

import NavMainItemContent from './NavMainItemContent'
import NavMainItemSidebar from './NavMainItemSidebar'
import { capitalize } from 'src/@global/utils'
import { possible } from 'src/@global/utils-typescript'

type Shape = {
  [l in Nav.NavMainIndex]: Nav.NavMainItemContentShape
}
const shapesContent: Shape = {
  0: 'DuckAbout',
  1: 'DuckHobby',
  2: 'DuckResume',
}

const shapeSidebar: Nav.NavMainItemSidebarShape = 'DuckSidebar'

const xOffset = '20px'
const left = (index: number) => `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)

export type Props = {
  navMainIndexRef: React.MutableRefObject<Nav.NavMainIndex>
  rerender: () => void
  navMainItems: { [k in Nav.NavMainIndex]: string }
}
export default ({ navMainIndexRef, rerender, navMainItems }: Props): React.ReactElement => {
  return (
    <>
      {possible.navMainIndexes.map((index) => (
        <NavMainItemContent
          key={index}
          href={navMainItems[index]}
          isActive={navMainIndexRef.current === index}
          left={left(index)}
          onclick={() => {
            navMainIndexRef.current = index
            rerender()
          }}
          shape={shapesContent[index]}
          text={capitalize(navMainItems[index].slice(1))}
        />
      ))}
      <NavMainItemSidebar left={left(3)} shape={shapeSidebar} text="Settings" />
    </>
  )
}
