import React  from 'react'
import {Link} from "@reach/router"
import {NavSubTubeProps} from "my-nav-type"

import {moveWater}                     from './moveWater'

import TubeText                        from './TubeText'

import {ReactComponent as ValveBorder} from 'src/@global/asset/valve/border.svg'
import {ReactComponent as ValveMask}   from 'src/@global/asset/valve/mask.svg'

const toggleElemsClassName = (elems: HTMLCollection, className: string) => {
  for (let i = 0; i < elems.length; i++) elems[i].classList.toggle(className)
}

const NavBarTube = ({baseURL, items, keyOffset, level, navIndex, setNavIndexs}: NavSubTubeProps): React.ReactElement => {

  const moveWaterToDest = (from: number, to: number, skipAnimation = window.matchMedia("(prefers-reduced-motion: reduce)").matches) => {
    if(from === to) return

    if(skipAnimation) {
      setNavIndexs(draft => {
        draft[level] = to / 2
      })
      return
    } else {
      const navTube = document.getElementById('nav-tube')
      const navLinkItems = navTube && navTube.getElementsByClassName('nav__link')
      if(navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')

      const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))
      const delayTotal = moveWater(from, to, transitionSec)

      window.setTimeout(function() {
        if(navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
        setNavIndexs(draft => {
          draft[level] = to / 2
        })
      }, (delayTotal + transitionSec) * 1000)
    }
  }

  return (
  <nav className='nav nav--tube' id='nav-tube'>
    <ul className='nav__list'>
      {items.map((tab: string, i: number) =>

      <React.Fragment key={i + keyOffset}>
        <li className='nav__item'>
          <Link className={'nav__link'} to={baseURL + tab} onClick={() => moveWaterToDest(navIndex * 2, i * 2)} draggable='false'>
            <TubeText word={tab[1].toUpperCase() + tab.slice(2)} />
            <div className="nav__highlighter-wrapper">
              <div id={'nav__highlighter-item' + i*2} className={'nav__highlighter-item' + (i === navIndex ? ' nav__highlighter-item--init' : '')}></div>
            </div>
          </Link>
        </li>

      {i < items.length - 1 &&
        <li className='nav__item'>
          <div className='valve'><ValveBorder /><ValveMask /></div>
          <div className="nav__highlighter-wrapper">
            <div id={'nav__highlighter-item' + (i*2 + 1)} className={'nav__highlighter-item' + (i === navIndex ? ' nav__highlighter-item--init' : '')}></div>
          </div>
        </li>
      }
      </React.Fragment>
      )}
    </ul>
  </nav>
  )
}

export default NavBarTube
