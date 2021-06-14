import React from 'react'
import { Link } from '@reach/router'
import { Updater } from 'use-immer'
import * as Nav from 'ts-type-nav'

import { moveWater } from './moveWater'
import TubeText from './TubeText'

import { ReactComponent as ValveBorder } from 'src/@global/asset/valve/border.svg'
import { ReactComponent as ValveMask } from 'src/@global/asset/valve/mask.svg'

type Props = {
  keyOffset: number
  navMainIndex: Nav.NavMainIndexSub
  navMainItem: string
  navSubIndex: number
  navSubItems: readonly string[]
  setNavSubIndexes: Updater<Nav.NavSubIndexes>
}
export default ({
  navMainItem,
  navSubItems,
  keyOffset,
  navMainIndex,
  navSubIndex,
  setNavSubIndexes,
}: Props): React.ReactElement => {
  const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))
  return (
    <nav className="nav-sub nav-sub--tube" id="nav-sub-tube">
      <ul className="nav-sub__list">
        {navSubItems.map((navSubItem: string, i: number) => (
          <React.Fragment key={i + keyOffset}>
            <li className="nav-sub__item">
              <Link
                className={'nav-sub__link'}
                to={navMainItem + navSubItem}
                onClick={() =>
                  moveWater({ from: navSubIndex * 2, to: i * 2 }, transitionSec, (to: number) =>
                    setNavSubIndexes((draft) => {
                      draft[navMainIndex] = to / 2
                    })
                  )
                }
                draggable="false">
                <TubeText word={navSubItem[1].toUpperCase() + navSubItem.slice(2)} />
                <div className="nav-sub__highlighter-wrapper">
                  <div
                    id={'nav-sub__highlighter-item' + i * 2}
                    className={
                      'nav-sub__highlighter-item' + (i === navSubIndex ? ' nav-sub__highlighter-item--init' : '')
                    }></div>
                </div>
              </Link>
            </li>

            {i < navSubItems.length - 1 && (
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
