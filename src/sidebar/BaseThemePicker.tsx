import React from 'react'
import { BaseThemePickerProps, BaseThemePickerItemProps } from 'my-settings-type'
import * as Theme from 'my-theme-type'

const BaseThemePickerItem = ({ base, current, setTheme }: BaseThemePickerItemProps): React.ReactElement => {
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

const BaseThemePicker = ({ current, setTheme }: BaseThemePickerProps): React.ReactElement => {
  const themes: Theme.Base[] = ['ocean', 'desert', 'sakura', 'snow']

  return (
    <div className="theme-picker-base">
      <div className="theme-picker-base__header">Base</div>
      <div className="theme-picker-base__content">
        {themes.map((base, i) => (
          <BaseThemePickerItem key={i} base={base} current={current} setTheme={setTheme} />
        ))}
      </div>
    </div>
  )
}

export default BaseThemePicker
