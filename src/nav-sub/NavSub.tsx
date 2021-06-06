import React from 'react'
import { NavSubProps } from 'my-nav-type'

import NavSubGeneric from './NavSubGeneric'
import NavSubTube from './NavSubTube'

const NavSub = ({
  baseURL,
  items,
  keyOffsets,
  navMainIndex,
  navSubIndex,
  setNavSubIndexs,
}: NavSubProps): React.ReactElement => {
  if (navSubIndex === null || (navMainIndex !== 0 && navMainIndex !== 1)) return <></>
  localStorage.setItem('tabIndexLv' + navMainIndex + 'Cur', navSubIndex.toString())

  const isMobile = window.matchMedia('(max-width: 768px)')
  if (isMobile.matches) {
    return (
      <NavSubGeneric
        baseURL={baseURL}
        items={items}
        navMainIndex={navMainIndex}
        navSubIndex={navSubIndex}
        setNavSubIndexs={setNavSubIndexs}
      />
    )
  } else {
    return (
      <NavSubTube
        baseURL={baseURL}
        items={items}
        navMainIndex={navMainIndex}
        navSubIndex={navSubIndex}
        setNavSubIndexs={setNavSubIndexs}
        keyOffset={keyOffsets[navMainIndex]}
      />
    )
  }
}

export default NavSub
