import React from 'react'
import {useImmer} from 'use-immer'

import NavBarTube    from './NavBarTube'
import NavBarGeneric from './NavBarGeneric'

const NavBar = props => {
  const {baseURL, items, keyOffset, level, navIndexs, setNavIndexs} = props

  localStorage.setItem('tabIndexLv' + level + 'Cur', navIndexs[level])

  return (
  <>
    <NavBarGeneric baseURL={baseURL} items={items} level={level} navIndex={navIndexs[level]} setNavIndexs={setNavIndexs} />
    <NavBarTube    baseURL={baseURL} items={items} level={level} navIndex={navIndexs[level]} setNavIndexs={setNavIndexs} keyOffset={keyOffset[level]} />
  </>
  )
}

export default NavBar
