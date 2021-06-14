import React from 'react'
import { Updater } from 'use-immer'
import * as Theme from 'ts-type-theme'

import { possible } from 'src/@global/utils-typescript'

type Props = {
  current: Theme.Base
  setTheme: Updater<Theme.Props>
}
export default ({ current, setTheme }: Props): React.ReactElement => (
  <div className="theme-picker-base">
    <div className="theme-picker-base__header">Base</div>
    <div className="theme-picker-base__content">
      {possible.themesBase.map((base, i) => (
        <Item key={i} base={base} current={current} setTheme={setTheme} />
      ))}
    </div>
  </div>
)

type ItemProps = Props & {
  base: Theme.Base
}
const Item = ({ base, current, setTheme }: ItemProps): React.ReactElement => {
  const classname = 'theme-picker-base__picker' + (current === base ? ' theme-picker-base__picker--active' : '')
  const onclick = () => {
    setTheme((draft) => {
      draft.base = base
      draft['custom-base'] = base
    })
  }
  const title = base[0].toUpperCase() + base.slice(1)
  return (
    <button theme-base={base} className={classname} onClick={onclick}>
      {title}
    </button>
  )
}
