import React from 'react'
import { Updater } from 'use-immer'
import * as Nav from 'ts-type-nav'

import NavSubGeneric from './NavSubGeneric'
import NavSubTube from './NavSubTube'

type Props = {
  keyOffsets: number[]
  navMainIndex: Nav.NavMainIndexSub
  navMainItem: string
  navSubIndex: number
  navSubItems: readonly string[]
  setNavSubIndexes: Updater<Nav.NavSubIndexes>
}
export default ({
  keyOffsets,
  navMainIndex,
  navMainItem,
  navSubIndex,
  navSubItems,
  setNavSubIndexes,
}: Props): React.ReactElement => {
  const isMobile = window.matchMedia('(max-width: 768px)')
  if (isMobile.matches) {
    return (
      <NavSubGeneric
        navMainItem={navMainItem}
        navSubItems={navSubItems}
        navMainIndex={navMainIndex}
        navSubIndex={navSubIndex}
        setNavSubIndexes={setNavSubIndexes}
      />
    )
  } else {
    return (
      <NavSubTube
        navMainItem={navMainItem}
        navSubItems={navSubItems}
        navMainIndex={navMainIndex}
        navSubIndex={navSubIndex}
        setNavSubIndexes={setNavSubIndexes}
        keyOffset={keyOffsets[navMainIndex]}
      />
    )
  }
}
