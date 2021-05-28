import React from 'react'
import {useEffect, useState} from 'react'
import {RgbStringColorPicker, RgbaStringColorPicker} from 'react-colorful'

import {SidebarProps} from 'my-settings-type'
import {Time} from 'my-time-type'
import {TubesColors} from 'my-tube-type'
import {DucksColors} from 'my-duck-type'
import {ThemeBase, ThemeSupplement} from 'my-theme-type'
import {WavesPhysics} from 'my-wave-config-type'

import BaseThemePicker from './BaseThemePicker'
import ThemePicker     from './ThemePicker'

const duckInputs: ({'type': (keyof DucksColors), 'text': string})[] = [
  {'type': 'body', 'text': 'Duck Body'},
  {'type': 'wing',  'text': 'Duck Wing'},
  {'type': 'beak', 'text': 'Duck Beak'}]
const timeInputs: ({'type': Time, 'id': string})[] = [
  {'type': 'day',  'id': 'time-day'},
  {'type': 'dark', 'id': 'time-dark'}]
const tubeInputs: ({'type': (keyof TubesColors), 'text': string})[] = [
  {'type': 'stroke', 'text': 'Tube'},
  {'type': 'water',  'text': 'Tube Water'}]
const waveColorInput = ['Front Wave', '2nd Wave', '3rd Wave']
const wavePhysicInputs: ({'name': (keyof WavesPhysics), 'min': number, 'max': number, 'step': number})[] = [
  {name: 'height',    min: 0, max: 70,  step: 10},
  {name: 'speed',     min: 0, max: 0.3, step: 0.05},
  {name: 'shakiness', min: 0, max: 6,   step: 1.5}]

const Sidebar = ({duckColors, getCustomStylesheet, theme, setTheme, time, setTime, toggleSidebar, tubeColors, waveColors, wavePhysics, setWavePhysics}: SidebarProps): React.ReactElement => {

  const themeInputs: ({'base': ThemeBase, 'supplement': ThemeSupplement})[] = [
    {base: 'ocean', supplement: 'ocean'},
    {base: 'desert', supplement: 'desert'},
    {base: 'sakura', supplement: 'sakura'},
    {base: 'snow', supplement: 'snow'},
    {base: theme['custom-base'], supplement: 'custom'}]

  const [, triggerReRender] = useState({})
  useEffect(() => {
    triggerReRender({})
  }, [theme.supplement])

  const changeCustomThemeVariable = (variable: string, value: string) => {
    theme.supplement !== 'custom' && setTheme(draft => {
      draft.supplement = 'custom'
    })
    localStorage.setItem(variable, value)

    const themeSupplementCustomElem = document.getElementById('theme-custom-supplement') as HTMLStyleElement
    if(themeSupplementCustomElem.sheet) {
      themeSupplementCustomElem.sheet.deleteRule(0)
      themeSupplementCustomElem.sheet.insertRule(getCustomStylesheet(), 0)
    }
  }

  const changeDuckColors = (obj: Partial<DucksColors>) => {
    const [part, rgb] = Object.entries(obj)[0] as [keyof DucksColors, DucksColors[keyof DucksColors]]
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
    setWavePhysics(draft => {
      draft[key] = val
    })
  }

  return(
    <>
    <button className='sidebar-toggler' id='sidebar-toggler' aria-label='settings toggler' onClick={toggleSidebar}></button>

    <div className='sidebar'>
      <section className='sidebar__section'>
        <div className="sidebar__header">Wave</div>
        {wavePhysicInputs.map(({name, min, max, step}, i) => {
          return (
           <div className='flex flex--sidebar-wave' key={i}>
             <div className='flex__item'>
               <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
             </div>
             <div className='flex__item'>
               <input name={name} type='range' min={min} max={max} value={wavePhysics[name]} step={step} onChange={e => changeWavePhysics({[name]: parseFloat(e.target.value)})} aria-label={'set wave ' + name} />
             </div>
           </div>
        )})}
      </section>

      <hr className='sidebar__linebreak' />

      <section className='sidebar__section'>
        <div className="sidebar__header">Time</div>

        <div className='flex flex--sidebar-time'>

          <div className='flex__item' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value as Time)}>
          {timeInputs.map(({type, id}, i) => {
            return (
              <div key={i}>
                <input type='radio' name='time' id={id} value={type} defaultChecked={time === type} />
                <span>&nbsp;&nbsp;</span>
                <label htmlFor={id}>{type[0].toUpperCase() + type.slice(1)}</label>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      <hr className='sidebar__linebreak' />

      <section className="sidebar__section">
        <div className="sidebar__header">Theme</div>

        <div className="grid grid--sidebar">
          {themeInputs.map(({base, supplement}, i) => {
            return (
              <div className="grid__item grid__item--6em" key={i}>
                <ThemePicker base={base} supplement={supplement} setTheme={setTheme} isActive={theme.supplement === supplement}/>
              </div>
            )}
          )}
        </div>
      </section>

      {theme.supplement === 'custom' &&
      <>
        <hr className='sidebar__linebreak sidebar__linebreak--20px' />

        <section className="sidebar__section">
          <div className="sidebar__header">Custom Theme</div>
          <div className="grid grid--sidebar">

            <div className='grid__item'>
              <BaseThemePicker current={theme.base} setTheme={setTheme}/>
            </div>

            {waveColorInput.map((text, i) => {
              return (
                <div className='grid__item' key={i}>
                  <div className="color-picker">
                    <div className='color-picker__header'>{text}</div>
                    <RgbaStringColorPicker color={waveColors.current[i]} onChange={rgba => changeWaveColor(i, rgba)} />
                  </div>
                </div>
              )}
            )}

            {duckInputs.map(({type, text}, i) => {
              return (
                <div className='grid__item' key={i}>
                  <div className="color-picker">
                    <div className='color-picker__header'>{text}</div>
                    <RgbStringColorPicker color={duckColors.current[type]} onChange={rgb => changeDuckColors({[type]: rgb})} />
                  </div>
                </div>
              )}
            )}

            {tubeInputs.map(({type, text}, i) => {
              return (
                <div className='grid__item grid__item--tube' key={i}>
                  <div className="color-picker">
                    <div className='color-picker__header'>{text}</div>
                    <RgbStringColorPicker color={tubeColors.current[type]} onChange={rgb => changeTubeColors({[type]: rgb})} />
                  </div>
                </div>
              )
            })
            }
          </div>
        </section>
      </>
      }
    </div>
    </>
  )
}

export default Sidebar
