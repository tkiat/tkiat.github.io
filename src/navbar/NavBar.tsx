import React from 'react'
import {NavbarProps} from "my-nav-type"

import NavBarTube    from './NavBarTube'
import NavBarGeneric from './NavBarGeneric'

const NavBar = ({baseURL, items, keyOffsets, level, navIndex, setNavIndexs}: NavbarProps): React.ReactElement => {
  localStorage.setItem('tabIndexLv' + level + 'Cur', navIndex.toString())
  return (
  <>
    <NavBarGeneric baseURL={baseURL} items={items} level={level} navIndex={navIndex} setNavIndexs={setNavIndexs} />
    <NavBarTube    baseURL={baseURL} items={items} level={level} navIndex={navIndex} setNavIndexs={setNavIndexs} keyOffset={keyOffsets[level]} />
  </>
  )
}

export default NavBar
