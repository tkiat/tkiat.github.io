import React from 'react'

import NavBarTube    from './NavBarTube'
import NavBarGeneric from './NavBarGeneric'

type ComponentProps = {
  baseURL: string,
  items: string[],
  keyOffset: number[],
  level: number,
  navIndexs: {[key: number]: number},
  setNavIndexs: object
  // navIndexs: {[level: string]: number},
  // TODO change object to react function
}
const NavBar: React.FunctionComponent<ComponentProps> = ({baseURL, items, keyOffset, level, navIndexs, setNavIndexs}) => {

  localStorage.setItem('tabIndexLv' + level + 'Cur', navIndexs[level])

  return (
  <>
    <NavBarGeneric baseURL={baseURL} items={items} level={level} navIndex={navIndexs[level]} setNavIndexs={setNavIndexs} />
    <NavBarTube    baseURL={baseURL} items={items} level={level} navIndex={navIndexs[level]} setNavIndexs={setNavIndexs} keyOffset={keyOffset[level]} />
  </>
  )
}

export default NavBar
