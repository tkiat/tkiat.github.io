import React from 'react'
import { useEffect, useState } from 'react'
import { RgbStringColorPicker, RgbaStringColorPicker } from 'react-colorful'

import { SidebarProps } from 'my-settings-type'
import { DuckColors, Time, TubesColors, WavesPhysics } from 'my-theme-type'

import injectCustomTheme from 'src/@global/injectCustomTheme'
import toggleSidebar from 'src/@global/toggleSidebar'
import { inputs } from './inputs'

import BaseThemePicker from './BaseThemePicker'
import ThemePicker from './ThemePicker'

const Sidebar = ({
  duckColors,
  theme,
  setTheme,
  time,
  setTime,
  tubeColors,
  waveColors,
  wavePhysics,
  setWavePhysics,
}: SidebarProps): React.ReactElement => {
  const [, triggerReRender] = useState({})
  useEffect(() => {
    triggerReRender({})
  }, [theme.supplement])

  const changeCustomThemeVariable = (variable: string, value: string) => {
    theme.supplement !== 'custom' &&
      setTheme((draft) => {
        draft.supplement = 'custom'
      })
    localStorage.setItem(variable, value)

    const themeSupplementCustomElem = document.getElementById('theme-custom-supplement') as HTMLStyleElement
    injectCustomTheme(themeSupplementCustomElem)
  }

  const changeDuckColors = (obj: Partial<DuckColors>) => {
    const [part, rgb] = Object.entries(obj)[0] as [keyof DuckColors, DuckColors[keyof DuckColors]]
    changeCustomThemeVariable('--duck-' + part + '-color', rgb)
    duckColors.current[part] = rgb
  }
  const changeTubeColors = (obj: Partial<TubesColors>) => {
    const [part, rgb] = Object.entries(obj)[0] as [keyof TubesColors, TubesColors[keyof TubesColors]]
    changeCustomThemeVariable('--tube-' + part + '-color', rgb)
    tubeColors.current[part] = rgb
  }
  const changeWaveColor = (waveIndex: number, rgba: string) => {
    changeCustomThemeVariable('--wave-front' + waveIndex + '-color', rgba)
    waveColors.current[waveIndex] = rgba
  }
  const changeWavePhysics = (obj: Partial<WavesPhysics>) => {
    const [key, val] = Object.entries(obj)[0] as [keyof WavesPhysics, WavesPhysics[keyof WavesPhysics]]
    setWavePhysics((draft) => {
      draft[key] = val
    })
  }

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
                    value={wavePhysics[name]}
                    step={step}
                    onChange={(e) => changeWavePhysics({ [name]: parseFloat(e.target.value) })}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value as Time)}>
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
                          onChange={(rgba) => changeWaveColor(i, rgba)}
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
                          color={duckColors.current[type]}
                          onChange={(rgb) => changeDuckColors({ [type]: rgb })}
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
                          color={tubeColors.current[type]}
                          onChange={(rgb) => changeTubeColors({ [type]: rgb })}
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
