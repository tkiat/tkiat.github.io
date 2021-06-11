import React from 'react'
import { RgbStringColorPicker, RgbaStringColorPicker } from 'react-colorful'

import { SidebarProps } from 'my-settings-type'
import { CustomColors, Time } from 'my-theme-type'

import injectCustomTheme from 'src/@global/injectCustomTheme'
import toggleSidebar from 'src/@global/toggleSidebar'
import { inputs } from './sidebarInputs'
import * as ts from 'src/@global/utils-typescript'

import BaseThemePicker from './BaseThemePicker'
import ThemePicker from './ThemePicker'

const changeCustomColor = (customColors: React.MutableRefObject<CustomColors>, variable: string, value: string) => {
  const possibleCustomColors: (keyof CustomColors)[] = [
    'duck-beak',
    'duck-body',
    'duck-wing',
    'tube-stroke',
    'tube-water',
    'wave-front0',
    'wave-front1',
    'wave-front2',
  ]
  if (ts.isType(variable, possibleCustomColors)) {
    customColors.current[variable] = value
    const customThemeElem = document.getElementById('theme-custom-supplement') as HTMLStyleElement // TODO move out
    injectCustomTheme(customThemeElem, customColors.current)
  }
}

const Sidebar = ({
  theme,
  setTheme,
  time,
  setTime,
  waveColors,
  wavePhysics,
  customColors,
}: SidebarProps): React.ReactElement => {
  const [, triggerReRender] = React.useState({})
  return (
    <>
      <button
        className="sidebar-toggler"
        id="sidebar-toggler"
        aria-label="settings toggler"
        onClick={toggleSidebar}></button>

      <div className="sidebar">
        <section className="sidebar__section">
          <div className="sidebar__header">Wave</div>
          {inputs['wave-physics'].map(({ name, min, max, step }, i) => {
            return (
              <div className="flex flex--sidebar-wave" key={i}>
                <div className="flex__item">
                  <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
                </div>
                <div className="flex__item">
                  <input
                    name={name}
                    type="range"
                    min={min}
                    max={max}
                    value={wavePhysics.current[name]}
                    step={step}
                    onChange={(e) => {
                      wavePhysics.current[name] = parseFloat(e.target.value)
                      triggerReRender({})
                    }}
                    aria-label={'set wave ' + name}
                  />
                </div>
              </div>
            )
          })}
        </section>

        <hr className="sidebar__linebreak" />

        <section className="sidebar__section">
          <div className="sidebar__header">Time</div>

          <div className="flex flex--sidebar-time">
            <div
              className="flex__item"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTime(e.target.value as Time)
              }}>
              {inputs.time.map(({ type, id }, i) => {
                return (
                  <div key={i}>
                    <input type="radio" name="time" id={id} value={type} defaultChecked={time === type} />
                    <span>&nbsp;&nbsp;</span>
                    <label htmlFor={id}>{type[0].toUpperCase() + type.slice(1)}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <hr className="sidebar__linebreak" />

        <section className="sidebar__section">
          <div className="sidebar__header">Theme</div>

          <div className="grid grid--sidebar">
            {inputs['theme-base']
              .concat({ base: theme['custom-base'], supplement: 'custom' })
              .map(({ base, supplement }, i) => {
                return (
                  <div className="grid__item grid__item--6em" key={i}>
                    <ThemePicker
                      base={base}
                      supplement={supplement}
                      setTheme={setTheme}
                      isActive={theme.supplement === supplement}
                    />
                  </div>
                )
              })}
          </div>
        </section>

        {theme.supplement === 'custom' && (
          <>
            <hr className="sidebar__linebreak sidebar__linebreak--20px" />

            <section className="sidebar__section">
              <div className="sidebar__header">Custom Theme</div>
              <div className="grid grid--sidebar">
                <div className="grid__item">
                  <BaseThemePicker current={theme.base} setTheme={setTheme} />
                </div>

                {inputs['wave-color'].map((text, i) => {
                  return (
                    <div className="grid__item" key={i}>
                      <div className="color-picker">
                        <div className="color-picker__header">{text}</div>
                        <RgbaStringColorPicker
                          color={waveColors.current[i]}
                          onChange={(rgba) => {
                            changeCustomColor(customColors, 'wave-front' + i + '-color', rgba)
                            waveColors.current[i] = rgba
                          }}
                        />
                      </div>
                    </div>
                  )
                })}

                {inputs.duck.map(({ type, text }, i) => {
                  return (
                    <div className="grid__item" key={i}>
                      <div className="color-picker">
                        <div className="color-picker__header">{text}</div>
                        <RgbStringColorPicker
                          color={customColors.current[type]}
                          onChange={(rgb) => changeCustomColor(customColors, type, rgb)}
                        />
                      </div>
                    </div>
                  )
                })}

                {inputs.tube.map(({ type, text }, i) => {
                  return (
                    <div className="grid__item grid__item--tube" key={i}>
                      <div className="color-picker">
                        <div className="color-picker__header">{text}</div>
                        <RgbStringColorPicker
                          color={customColors.current[type]}
                          onChange={(rgb) => changeCustomColor(customColors, type, rgb)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default Sidebar
