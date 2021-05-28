import React from 'react'
import {useEffect, useState} from 'react'
import {RgbStringColorPicker, RgbaStringColorPicker} from 'react-colorful'
import {ThemeBase, ThemeSupplement} from 'my-theme-type'

import BaseThemePicker from './BaseThemePicker'
import ThemePicker     from './ThemePicker'

const Sidebar = (props): React.ReactElement => {

  const [, triggerReRender] = useState({})
  useEffect(() => {
    triggerReRender({})
  }, [props.theme.supplement])

  const changeCustomThemeVariable = (variable, value) => {
    props.theme.supplement !== 'custom' && props.setTheme(draft => {
      draft.supplement = 'custom'
    })
    localStorage.setItem(variable, value)

    const themeSupplementCustomElem = document.getElementById('theme-custom-supplement')
    if(themeSupplementCustomElem) {
      themeSupplementCustomElem.sheet.deleteRule(0)
      themeSupplementCustomElem.sheet.insertRule(props.getCustomStylesheet(), 0)
    }
  }

  const changeDuckColors = (part, rgb) => {
    changeCustomThemeVariable('--duck-' + part + '-color', rgb)
    props.duckColors.current[part] = rgb
  }
  const changeTubeColors = (part, rgb) => {
    changeCustomThemeVariable('--tube-' + part + '-color', rgb)
    props.tubeColors.current[part] = rgb
  }
  const changeWaveColor = (rgba, waveIndex) => {
    changeCustomThemeVariable('--wave-front' + waveIndex + '-color', rgba)
    props.waveColors.current[waveIndex] = rgba
  }
  const changeWavePhysics = (prop, value) => {
    props.setWavePhysics(draft => {
      draft[prop] = parseFloat(value)
    })
  }

  return(
    <>
    <button className='sidebar-toggler' id='sidebar-toggler' aria-label='settings toggler' onClick={props.toggleSidebar}></button>

    <div className='sidebar'>
      <section className='sidebar__section'>
        <div className="sidebar__header">Wave</div>

        <div className='flex flex--sidebar-wave'>

          <div className='flex__item'>
            <label htmlFor='height'>Height</label>
          </div>

          <div className='flex__item'>
            <input name='height' type='range' min='0' max='70' value={props.wavePhysics.height} step='10' onChange={e => changeWavePhysics('height', e.target.value)} aria-label='set wave height' />
          </div>
        </div>

        <div className='flex flex--sidebar-wave'>

          <div className='flex__item'>
            <label htmlFor='speed'>Speed</label>
          </div>

          <div className='flex__item'>
            <input name='speed' type='range' min='0' max='0.3' value={props.wavePhysics.speed} step='0.05' onChange={e => changeWavePhysics('speed', e.target.value)} aria-label='set wave speed' />
          </div>
        </div>

        <div className='flex flex--sidebar-wave'>

          <div className='flex__item'>
            <label htmlFor='shakiness'>Shakiness</label>
          </div>

          <div className='flex__item'>
            <input name='shakiness' type='range' min='0' max='6' value={props.wavePhysics.shakiness} step='1.5' onChange={e => changeWavePhysics('shakiness', e.target.value)} aria-label='set wave shakiness' />
          </div>
        </div>
      </section>

      <hr className='sidebar__linebreak' />

      <section className='sidebar__section'>

        <div className='flex flex--sidebar-time'>

          <div className='flex__item'>
            <div>Time</div>
          </div>

          <div className='flex__item'>

            <div>
              <input type="radio" name="time" id="time-day" value="day" defaultChecked={props.time === 'day'} onChange={e => props.setTime(e.target.value)} />
              <span>&nbsp;&nbsp;</span>
              <label htmlFor="time-day">Day</label>
            </div>

            <div>
              <input type="radio" name="time" id="time-dark" value="dark" defaultChecked={props.time === 'dark'} onChange={e => props.setTime(e.target.value)} />
              <span>&nbsp;&nbsp;</span>
              <label htmlFor="time-dark">Dark</label>
            </div>
          </div>
        </div>
      </section>

      <hr className='sidebar__linebreak' />

      <section className="sidebar__section">
        <div className="sidebar__header">Theme</div>

        <div className="grid grid--sidebar">

          <div className="grid__item grid__item--6em">
            <ThemePicker base={'ocean'} supplement={'ocean'} setTheme={props.setTheme} isActive={props.theme.supplement === 'ocean'}/>
          </div>

          <div className="grid__item grid__item--6em">
            <ThemePicker base={'desert'} supplement={'desert'} setTheme={props.setTheme} isActive={props.theme.supplement === 'desert'}/>
          </div>

          <div className="grid__item grid__item--6em">
            <ThemePicker base={'sakura'} supplement={'sakura'} setTheme={props.setTheme} isActive={props.theme.supplement === 'sakura'}/>
          </div>

          <div className="grid__item grid__item--6em">
            <ThemePicker base={'snow'} supplement={'snow'} setTheme={props.setTheme} isActive={props.theme.supplement === 'snow'}/>
          </div>

          <div className="grid__item grid__item--6em">
            <ThemePicker base={props.theme['custom-base']} supplement={'custom'} setTheme={props.setTheme} isActive={props.theme.supplement === 'snow'}/>
          </div>
        </div>
      </section>

      {props.theme.supplement === 'custom' &&
      <>
        <hr className='sidebar__linebreak sidebar__linebreak--20px' />

        <section className="sidebar__section">
          <div className="sidebar__header">Custom Theme</div>
          <div className="grid grid--sidebar">

            <div className='grid__item'>
              <BaseThemePicker current={props.theme.base} setTheme={props.setTheme}/>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>Front Wave</div>
                <RgbaStringColorPicker color={props.waveColors.current[0]} onChange={rgba => changeWaveColor(rgba, 0)} />
              </div>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>2nd Wave</div>
                <RgbaStringColorPicker color={props.waveColors.current[1]} onChange={rgba => changeWaveColor(rgba, 1)} />
              </div>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>3rd Wave</div>
                <RgbaStringColorPicker color={props.waveColors.current[2]} onChange={rgba => changeWaveColor(rgba, 2)} />
              </div>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>Duck Body</div>
                <RgbStringColorPicker color={props.duckColors.current.body} onChange={rgb => changeDuckColors('body', rgb)} />
              </div>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>Duck Wing</div>
                <RgbStringColorPicker color={props.duckColors.current.wing} onChange={rgb => changeDuckColors('wing', rgb)} />
              </div>
            </div>

            <div className='grid__item'>
              <div className="color-picker">
                <div className='color-picker__header'>Duck Beak</div>
                <RgbStringColorPicker color={props.duckColors.current.beak} onChange={rgb => changeDuckColors('beak', rgb)} />
              </div>
            </div>

            <div className='grid__item grid__item--tube'>
              <div className="color-picker">
                <div className='color-picker__header'>Tube</div>
                <RgbStringColorPicker color={props.tubeColors.current.stroke} onChange={rgb => changeTubeColors('stroke', rgb)} />
              </div>
            </div>

            <div className='grid__item grid__item--tube'>
              <div className="color-picker">
                <div className='color-picker__header'>Tube Water</div>
                <RgbStringColorPicker color={props.tubeColors.current.water} onChange={rgb => changeTubeColors('water', rgb)} />
              </div>
            </div>
          </div>
        </section>
      </>
      }
    </div>
    </>
  )
}

export default Sidebar
