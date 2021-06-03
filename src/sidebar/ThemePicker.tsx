import React from 'react'
import { ThemePickerProps } from 'my-settings-type'

const ThemePicker = ({ base, supplement, isActive, setTheme }: ThemePickerProps): React.ReactElement => {
  const classname = 'theme-picker' + (isActive ? ' theme-picker--active' : '')
  const onclick = () => {
    setTheme((draft) => {
      draft.base = base
      draft.supplement = supplement
    })
    localStorage.setItem('theme-base', base)
    localStorage.setItem('theme-supplement', supplement)
  }
  const text = supplement[0].toUpperCase() + supplement.slice(1)
  return (
    <button className={classname} theme-base={base} theme-supplement={supplement} onClick={onclick}>
      {
        //@ts-ignore
        <div className="theme-picker__nav" overlaytext={text}>
          {text}
        </div>
      }
      <div className="theme-picker__header">Header</div>
      <div className="theme-picker__text">This is sample text.</div>
      <div className="theme-picker__duck theme-picker__duck--0"></div>
      <div className="theme-picker__duck theme-picker__duck--3"></div>
      <div className="theme-picker__wave theme-picker__wave--0"></div>
      <div className="theme-picker__wave theme-picker__wave--1"></div>
      <div className="theme-picker__wave theme-picker__wave--2"></div>
    </button>
  )
}

export default ThemePicker
