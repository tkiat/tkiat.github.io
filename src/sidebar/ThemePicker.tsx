import React from 'react'
import { Updater } from 'use-immer'

import * as Theme from 'ts-type-theme'

type Props = {
  base: Theme.Base
  supplement: Theme.Supplement

  isActive: boolean
  setTheme: Updater<Theme.Props>
}
export default ({ base, supplement, isActive, setTheme }: Props): React.ReactElement => {
  const classname = 'theme-picker' + (isActive ? ' theme-picker--active' : '')
  const onclick = () => {
    setTheme((draft) => {
      draft.base = base
      draft.supplement = supplement
    })
  }
  const text = supplement[0].toUpperCase() + supplement.slice(1)
  return (
    <button className={classname} theme-base={base} theme-supplement={supplement} onClick={onclick}>
      {
        //@ts-ignore
        <div className="theme-picker__nav-sub" overlaytext={text}>
          {text}
        </div>
      }
      <div className="theme-picker__header">Header</div>
      <div className="theme-picker__text">This is sample text.</div>
      <div className="theme-picker__nav-main theme-picker__nav-main--0"></div>
      <div className="theme-picker__nav-main theme-picker__nav-main--3"></div>
      <div className="theme-picker__wave theme-picker__wave--0"></div>
      <div className="theme-picker__wave theme-picker__wave--1"></div>
      <div className="theme-picker__wave theme-picker__wave--2"></div>
    </button>
  )
}
