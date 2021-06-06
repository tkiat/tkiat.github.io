import React from 'react'
import { Link } from '@reach/router'

import { NavSubTubeProps } from 'my-nav-type'
import { Even } from 'my-util-type'

import { moveWater } from './moveWater'
import TubeText from './TubeText'
import { ReactComponent as ValveBorder } from 'src/@global/asset/valve/border.svg'
import { ReactComponent as ValveMask } from 'src/@global/asset/valve/mask.svg'

const isEven = (num: number): num is Even => num % 2 == 0
const checkEven = ({ from, to }: { from: number; to: number }): { from: Even | -1; to: Even | -1 } => {
  return {
    from: isEven(from) ? from : -1,
    to: isEven(to) ? to : -1,
  }
}
const toggleElemsClassName = (elems: HTMLCollection, className: string) => {
  for (let i = 0; i < elems.length; i++) elems[i].classList.toggle(className)
}
const moveWaterToDest = (plan: { from: Even | -1; to: Even | -1 }, callback: (to: Even) => void) => {
  const from = plan.from
  const to = plan.to
  if (from === to || from === -1 || to === -1) return

  const skipAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (skipAnimation) {
    callback(to)
    return
  } else {
    const navTube = document.getElementById('nav-sub-tube')
    const navLinkItems = navTube && navTube.getElementsByClassName('nav-sub__link')
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')

    const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))

    const delayTotal = moveWater(from, to, transitionSec)

    window.setTimeout(function () {
      if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
      callback(to)
    }, (delayTotal + transitionSec) * 1000)
  }
}

const NavBarTube = ({
  baseURL,
  items,
  keyOffset,
  navMainIndex,
  navSubIndex,
  setNavSubIndexs,
}: NavSubTubeProps): React.ReactElement => {
  const callback = (to: Even) =>
    setNavSubIndexs((draft) => {
      draft[navMainIndex] = to / 2
    })
  return (
    <nav className="nav-sub nav-sub--tube" id="nav-sub-tube">
      <ul className="nav-sub__list">
        {items.map((tab: string, i: number) => (
          <React.Fragment key={i + keyOffset}>
            <li className="nav-sub__item">
              <Link
                className={'nav-sub__link'}
                to={baseURL + tab}
                onClick={() => moveWaterToDest(checkEven({ from: navSubIndex * 2, to: i * 2 }), callback)}
                draggable="false">
                <TubeText word={tab[1].toUpperCase() + tab.slice(2)} />
                <div className="nav-sub__highlighter-wrapper">
                  <div
                    id={'nav-sub__highlighter-item' + i * 2}
                    className={
                      'nav-sub__highlighter-item' + (i === navSubIndex ? ' nav-sub__highlighter-item--init' : '')
                    }></div>
                </div>
              </Link>
            </li>

            {i < items.length - 1 && (
              <li className="nav-sub__item">
                <div className="valve">
                  <ValveBorder />
                  <ValveMask />
                </div>
                <div className="nav-sub__highlighter-wrapper">
                  <div
                    id={'nav-sub__highlighter-item' + (i * 2 + 1)}
                    className={
                      'nav-sub__highlighter-item' + (i === navSubIndex ? ' nav-sub__highlighter-item--init' : '')
                    }></div>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  )
}

export default NavBarTube
