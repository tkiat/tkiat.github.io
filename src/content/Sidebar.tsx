import React from 'react'
import {useEffect, useState} from 'react'
import {RgbStringColorPicker, RgbaStringColorPicker} from "react-colorful"

const BaseThemePickerForCustom = props => {
  const classname = "theme-picker-base__picker" + (props.current === props.base ? ' theme-picker-base__picker--active' : '')
  const onclick = () => {
    props.setTheme(draft => {
      draft.base = props.base
      draft['custom-base'] = props.base
    })
    localStorage.setItem('theme-base', props.base)
    localStorage.setItem('theme-custom-base', props.base)
  }
  const title = props.base[0].toUpperCase() + props.base.slice(1)
  return <button theme-base={props.base} className={classname} onClick={onclick}>{title}</button>
}
const ThemePicker = props => {
  const classname = 'theme-picker' + (props.isActive ? ' theme-picker--active' : '')
  const onclick = () => {
    props.setTheme(draft => {
      draft.base = props.base
      draft.supplement = props.supplement
    })
    localStorage.setItem('theme-base', props.base)
    localStorage.setItem('theme-supplement', props.supplement)
  }
  return (
    <button className={classname} theme-base={props.base} theme-supplement={props.supplement} onClick={onclick}>
      <div className='theme-picker__nav' overlaytext={props.text}>{props.text}</div>
      <div className='theme-picker__header'>Header</div>
      <div className='theme-picker__text'>This is sample text.</div>
      <div className='theme-picker__duck theme-picker__duck--0'></div>
      <div className='theme-picker__duck theme-picker__duck--3'></div>
      <div className='theme-picker__wave theme-picker__wave--0'></div>
      <div className='theme-picker__wave theme-picker__wave--1'></div>
      <div className='theme-picker__wave theme-picker__wave--2'></div>
    </button>
  )
}

const Sidebar = props => {
  const [, triggerReRender] = useState(undefined)
  useEffect(() => {
    triggerReRender({})
  }, [props.theme.supplement])

  const changeCustomThemeVariable = (variable, value) => {
    props.theme.supplement !== 'custom' && props.setTheme(draft => {
      draft.supplement = 'custom'
    })
    localStorage.setItem(variable, value)

    const themeSupplementCustomElem = document.getElementById('theme-custom-supplement')
    themeSupplementCustomElem.sheet.deleteRule(0)
    themeSupplementCustomElem.sheet.insertRule(props.getCustomStylesheet(), 0)
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
          <div className='flex__item' onChange={e => props.setTime(e.target.value)}>
            <div>
              <input type="radio" name="time" id="time-day" value="day" defaultChecked={props.time === 'day'} />
              <span>&nbsp;&nbsp;</span>
              <label htmlFor="time-day">Day</label>
            </div>
            <div>
              <input type="radio" name="time" id="time-dark" value="dark" defaultChecked={props.time === 'dark'} />
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
          {[{base: 'ocean',    supplement: 'ocean',    text: 'Ocean'},
            {base: 'desert', supplement: 'desert', text: 'Desert'},
            {base: 'sakura', supplement: 'sakura', text: 'Sakura'},
            {base: 'snow',   supplement: 'snow',   text: 'Snow'},
            {base: props.theme['custom-base'], supplement: 'custom', text: 'Custom'}].map((theme, i) =>
          <div key={i} className="grid__item grid__item--6em">
            <ThemePicker base={theme.base} supplement={theme.supplement} text={theme.text} setTheme={props.setTheme} isActive={props.theme.supplement === theme.supplement}/>
          </div>
          )}
        </div>
      </section>

      {props.theme.supplement === 'custom' &&
      <>
        <hr className='sidebar__linebreak sidebar__linebreak--20px' />

        <section className="sidebar__section">
          <div className="sidebar__header">Custom Theme</div>

          <div className="grid grid--sidebar">
            <div className='grid__item'>
              <div className="theme-picker-base">
                <div className='theme-picker-base__header'>Base</div>
                <div className='theme-picker-base__content'>
                  {['ocean', 'desert', 'sakura', 'snow'].map((base, i) =>
                  <BaseThemePickerForCustom key={i} base={base} current={props.theme.base} setTheme={props.setTheme}/>)}
                </div>
              </div>
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
