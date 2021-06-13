import React from 'react'
import * as Sidebar from 'ts-type-sidebar'
import { possible } from 'src/@global/utils-typescript'

const BaseThemePickerItem = ({ base, current, setTheme }: Sidebar.BaseThemePickerItemProps): React.ReactElement => {
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

const BaseThemePicker = ({ current, setTheme }: Sidebar.BaseThemePickerProps): React.ReactElement => {
  return (
    <div className="theme-picker-base">
      <div className="theme-picker-base__header">Base</div>
      <div className="theme-picker-base__content">
        {possible.themesBase.map((base, i) => (
          <BaseThemePickerItem key={i} base={base} current={current} setTheme={setTheme} />
        ))}
      </div>
    </div>
  )
}

export default BaseThemePicker
