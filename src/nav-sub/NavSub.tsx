import React from 'react'
import {NavSubProps} from "my-nav-type"

import NavSubTube    from './NavSubTube'
import NavSubGeneric from './NavSubGeneric'

const NavSub = ({baseURL, items, keyOffsets, level, navIndex, setNavIndexs}: NavSubProps): React.ReactElement => {
  if(level === 2) return <></>
  localStorage.setItem('tabIndexLv' + level + 'Cur', navIndex.toString())
  return (
  <>
    <NavSubGeneric baseURL={baseURL} items={items} level={level} navIndex={navIndex} setNavIndexs={setNavIndexs} />
    <NavSubTube    baseURL={baseURL} items={items} level={level} navIndex={navIndex} setNavIndexs={setNavIndexs} keyOffset={keyOffsets[level]} />
  </>
  )
}

export default NavSub
