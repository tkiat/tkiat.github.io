import React  from 'react'
import {Link} from "@reach/router"
import {NavbarGenericProps} from "my-nav-type"

import {ReactComponent as DuckHamburger} from 'src/duck/svg/duck-hamburger.svg'

const NavBarGeneric = ({baseURL, items, level, navIndex, setNavIndexs}: NavbarGenericProps): React.ReactElement => {
  const onclick = (i: number) => {
    setNavIndexs(draft => {
      draft[level] = i
    })
  }
  const navPress = () => {
    const navGeneric = document.getElementById('nav-generic')
    navGeneric && navGeneric.classList.toggle('nav--pressed')
  }
  return (
  <nav className='nav nav--generic' id='nav-generic' onClick={navPress}>
    <ul className='nav__list'>
      <li className='nav__item nav__item--button' aria-label="hamburger-menu"><DuckHamburger /></li>
      {items.map((tab, i) =>
        <li key={i} className='nav__item'>
          <Link className={'nav__link' + (i === navIndex ? ' nav__link--active' : '')} to={baseURL + tab} onClick={() => onclick(i)}>
            {tab[1].toUpperCase() + tab.slice(2)}
          </Link>
        </li>
      )}
    </ul>
  </nav>
  )
}

export default NavBarGeneric
