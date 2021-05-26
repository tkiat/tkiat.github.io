import React  from 'react'
import {Link} from "@reach/router"

import {moveWater}                     from './moveWater'

import TubeText                        from './TubeText'

import {ReactComponent as ValveBorder} from './valve/border.svg'
import {ReactComponent as ValveMask}   from './valve/mask.svg'

const toggleElemsClassName = (elems, className) => {
  elems.forEach(elem => elem.classList.toggle(className))
}

const NavBarListTube = props => {
  const moveWaterToDest = (from, to, skipAnimation = window.matchMedia("(prefers-reduced-motion: reduce)").matches) => {
    if(from === to) return

    if(skipAnimation) {
      props.setNavIndexs(draft => {
        draft[props.level] = to / 2
      })
      return
    } else {
      const navLinkItems = Array.from(document.getElementById('nav-tube').getElementsByClassName('nav__link'))
      toggleElemsClassName(navLinkItems, 'waiting')

      const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))
      const delayTotal = moveWater(from, to, transitionSec)

      window.setTimeout(function() {
        toggleElemsClassName(navLinkItems, 'waiting')
        props.setNavIndexs(draft => {
          draft[props.level] = to / 2
        })
      }, (delayTotal + transitionSec) * 1000)
    }
  }

  return (
  <nav className='nav nav--tube' id='nav-tube'>
    <ul className='nav__list'>
      {props.items.map((tab, i) =>

      <React.Fragment key={i + props.keyOffset}>
        <li className='nav__item'>
          <Link className={'nav__link'} to={props.baseURL + tab} onClick={() => moveWaterToDest(props.navIndex * 2, i * 2)} draggable='false'>
            <TubeText word={tab[1].toUpperCase() + tab.slice(2)} />
            <div className="nav__highlighter-wrapper">
              <div id={'nav__highlighter-item' + i*2} className={'nav__highlighter-item' + (i === props.navIndex ? ' nav__highlighter-item--init' : '')}></div>
            </div>
          </Link>
        </li>

      {i < props.items.length - 1 &&
        <li className='nav__item'>
          <div className='valve'><ValveBorder /><ValveMask /></div>
          <div className="nav__highlighter-wrapper">
            <div id={'nav__highlighter-item' + (i*2 + 1)} className={'nav__highlighter-item' + (i === props.navIndex ? ' nav__highlighter-item--init' : '')}></div>
          </div>
        </li>
      }
      </React.Fragment>
      )}
    </ul>
  </nav>
  )
}

export default NavBarListTube
