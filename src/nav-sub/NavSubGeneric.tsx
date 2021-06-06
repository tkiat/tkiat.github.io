import React from 'react'
import { Link } from '@reach/router'
import { NavSubGenericProps } from 'my-nav-type'

import { ReactComponent as DuckHamburger } from 'src/@global/asset/duck/duck-hamburger.svg'

const NavBarGeneric = ({
  baseURL,
  items,
  navMainIndex,
  navSubIndex,
  setNavSubIndexs,
}: NavSubGenericProps): React.ReactElement => {
  const onclick = (i: number) => {
    setNavSubIndexs((draft) => {
      draft[navMainIndex] = i
    })
  }
  const navPress = () => {
    const navGeneric = document.getElementById('nav-sub-generic')
    navGeneric && navGeneric.classList.toggle('nav-sub--pressed')
  }
  return (
    <nav className="nav-sub nav-sub--generic" id="nav-sub-generic" onClick={navPress}>
      <ul className="nav-sub__list">
        <li className="nav-sub__item nav-sub__item--button" aria-label="hamburger-menu">
          <DuckHamburger />
        </li>
        {items.map((tab, i) => (
          <li key={i} className="nav-sub__item">
            <Link
              className={'nav-sub__link' + (i === navSubIndex ? ' nav-sub__link--active' : '')}
              to={baseURL + tab}
              onClick={() => onclick(i)}>
              {tab[1].toUpperCase() + tab.slice(2)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBarGeneric
