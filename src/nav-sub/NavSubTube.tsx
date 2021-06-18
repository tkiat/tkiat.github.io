import React from 'react'
import { Updater } from 'use-immer'
import * as Nav from 'ts-type-nav'

import { moveWater } from './tube-utils/moveWater'

import NodeText from './tube-utils/NodeText'
import NodeValve from './tube-utils/NodeValve'

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
  const updateSubIndex = (to: number) => () =>
    setNavSubIndexes((draft) => {
      draft[navMainIndex] = to / 2
    })
  const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))
  const navLinkItems = document.getElementsByClassName('nav-sub__link')

  return (
    <nav className="nav-sub nav-sub--tube" id="nav-sub-tube">
      <ul className="nav-sub__list">
        {navSubItems.map((navSubItem: string, i: number) => (
          <React.Fragment key={i + keyOffset}>
            <li className="nav-sub__item">
              <NodeText
                i={i}
                cur={navSubIndex}
                to={navMainItem + navSubItem}
                onclick={() => moveWater(navSubIndex * 2, i * 2, transitionSec, navLinkItems, updateSubIndex(i * 2))}
                word={navSubItem[1].toUpperCase() + navSubItem.slice(2)}
              />
            </li>

            {i < navSubItems.length - 1 && (
              <li className="nav-sub__item">
                <NodeValve i={i} cur={navSubIndex} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  )
}
