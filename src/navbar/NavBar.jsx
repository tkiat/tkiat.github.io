import React from 'react'
import {useImmer} from 'use-immer'

import NavBarTube    from './NavBarTube'
import NavBarGeneric from './NavBarGeneric'

const NavBar = props => {
  const {baseURL, tabIndexDefault, items, level} = props

  const currentTab = window.location.href.substr(window.location.href.lastIndexOf('/'))
  const currentTabIndex = items.findIndex(item => item === currentTab)
  currentTabIndex >= 0 && localStorage.setItem('tabIndexLv' + level + 'Cur', currentTabIndex)

  const [curNavItemIndex, setCurNavItemIndex] = useImmer({...tabIndexDefault, [level]: currentTabIndex})

  const isNavbarInvalid = !Array.isArray(props.items) || !props.items.length

  if(isNavbarInvalid)
    return <></>
  else
    return (
    <>
      <NavBarGeneric baseURL={baseURL} curNodeIndex={curNavItemIndex[level]} items={items} level={level} setCurNavItemIndex={setCurNavItemIndex} />
      <NavBarTube baseURL={baseURL} curNodeIndex={curNavItemIndex[level]} items={items} level={level} offset={props.navItemIndexOffset[level]} setCurNavItemIndex={setCurNavItemIndex}/>
    </>
    )
}

export default NavBar
