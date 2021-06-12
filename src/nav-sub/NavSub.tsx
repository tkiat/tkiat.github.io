import React from 'react'
import { NavSubProps } from 'ts-type-nav'

import NavSubGeneric from './NavSubGeneric'
import NavSubTube from './NavSubTube'

const NavSub = ({
  navMainItem,
  navSubItems,
  keyOffsets,
  navMainIndex,
  navSubIndex,
  setNavSubIndexes,
}: NavSubProps): React.ReactElement => {
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

export default NavSub
