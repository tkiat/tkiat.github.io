import React from 'react'
import { RgbStringColorPicker, RgbaStringColorPicker } from 'react-colorful'

import { Updater } from 'use-immer'
import * as Theme from 'ts-type-theme'

import toggleSidebar from 'src/@global/toggleSidebar'
import * as inputs from './sidebarInputs'

import changeCustomColor from './changeCustomColor'
import BaseThemePicker from './BaseThemePicker'
import ThemePicker from './ThemePicker'

type Props = {
  theme: Theme.Props
  setTheme: Updater<Theme.Props>

  time: Theme.Time
  setTime: Updater<Theme.Time>

  waveColors: React.MutableRefObject<Theme.WaveColors>
  wavePhysics: React.MutableRefObject<Theme.WavePhysics>

  customColors: React.MutableRefObject<Theme.CustomColors>
}
export default ({
  theme,
  setTheme,
  time,
  setTime,
  waveColors,
  wavePhysics,
  customColors,
}: Props): React.ReactElement => {
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
          {inputs.wavePhysic.map(({ prop, min, max, step }, i) => {
            return (
              <div className="flex flex--sidebar-wave" key={i}>
                <div className="flex__item">
                  <label htmlFor={prop}>{prop[0].toUpperCase() + prop.slice(1)}</label>
                </div>
                <div className="flex__item">
                  <input
                    name={prop}
                    type="range"
                    min={min}
                    max={max}
                    value={wavePhysics.current[prop]}
                    step={step}
                    onChange={(e) => {
                      wavePhysics.current[prop] = parseFloat(e.target.value)
                      triggerReRender({})
                    }}
                    aria-label={'set wave ' + prop}
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
                setTime(e.target.value as Theme.Time)
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
            {inputs.themeDefault
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

                {inputs.waveColorTitle.map((text, i) => {
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
