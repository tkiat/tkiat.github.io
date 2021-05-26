import React from 'react'
import {Link} from "@reach/router"

import {ReactComponent as DuckHamburger} from '@/duck/svg/duck-hamburger.svg'

const NavBarGeneric = props => {
  const onclick = i => {
    props.setNavIndexs(draft => {
      draft[props.level] = i
    })
  }
  const navPress = () => {
    document.getElementById('nav-generic').classList.toggle('nav--pressed')
  }
  return (
  <nav className='nav nav--generic' id='nav-generic' onClick={navPress}>
    <ul className='nav__list'>
      <li className='nav__item nav__item--button' aria-label="hamburger-menu"><DuckHamburger /></li>
      {props.items.map((tab, i) =>
        <li key={i} className='nav__item'>
          <Link className={'nav__link' + (i === props.navIndex ? ' nav__link--active' : '')} to={props.baseURL + tab} onClick={() => onclick(i)}>
            {tab[1].toUpperCase() + tab.slice(2)}
          </Link>
        </li>
      )}
    </ul>
  </nav>
  )
}

export default NavBarGeneric
