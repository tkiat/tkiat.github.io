import React from 'react'
import {useImmer} from 'use-immer'
import {Redirect, Router} from "@reach/router"

import {DucksColors, DuckShape} from 'my-duck-type'
import {NavIndexsType} from 'my-nav-type'
import {ThemeBase, ThemeSupplement, ThemeProps} from 'my-theme-type'
import {Time} from 'my-time-type'
import {TubesColors} from 'my-tube-type'
import {WavesColors as WavesColorsType, WavesConfigs as WavesConfigsType, WavesPhysics as WavesPhysicsType} from 'my-wave-config-type'

import useDebounce   from 'src/hook-custom/useDebounce'

import Canvas        from 'src/canvas/Canvas'
import Sidebar       from 'src/content/settings/Sidebar'
import Contact       from 'src/content/resume/Contact'
import Content       from 'src/router/Content'
import Title         from 'src/content/Title'
import Duck          from 'src/duck/Duck'
import DuckSidebar   from 'src/duck/DuckSidebar'
import NavBar        from 'src/navbar/NavBar'
import SafariWarning from 'src/SafariWarning'

import {ReactComponent as Desert} from 'src/background/desert.svg'
import {ReactComponent as Ocean}  from 'src/background/ocean.svg'
import {ReactComponent as Sakura} from 'src/background/sakura.svg'
import {ReactComponent as Snow}   from 'src/background/snow.svg'

import './sass/main.scss'

// TODO try to make readnme more visual and less verbose
// TODO in projects show keyword tooltip instead
// TODO what if in project we add another navbar left sidebar and show project on the right
// TODO do anim project https://lihautan.com/blogs/

const themeFallback: ThemeBase = 'sakura'

const isBaseTheme = (theme: string | null): theme is ThemeBase => {
  const themes: ThemeBase[] = ['ocean', 'desert', 'sakura', 'snow']
  return themes.includes(theme as ThemeBase)
}
const isSupplementTheme = (theme: string | null): theme is ThemeSupplement => {
  const themes: ThemeSupplement[] = ['ocean', 'desert', 'sakura', 'snow', 'custom']
  return themes.includes(theme as ThemeSupplement)
}
const getInitialThemeBase       = (theme: string | null) => (isBaseTheme(theme) ? theme : themeFallback)
const getInitialThemeSupplement = (theme: string | null) => (isSupplementTheme(theme) ? theme : themeFallback)

const timeFallback: Time = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'day'

const isTime = (time: string | null): time is Time => {
  const times: Time[] = ['day', 'dark']
  return times.includes(time as Time)
}
const getInitialTime = (time: string | null) => (isTime(time) ? time : timeFallback)

const getBackground = (theme: string) => {
  switch(theme) {
    case 'ocean':
      return <Ocean className='background' />
    case 'desert':
      return <Desert className='background' />
    case 'sakura':
      return <Sakura className='background' />
    case 'snow':
      return <Snow className='background' />
    default:
      return <></>
  }
}
const getCustomStylesheet = () => {
  return `
  [theme-supplement='custom'] {
    --duck-beak-color:${localStorage.getItem('--duck-beak-color') ?? 'rgb(0, 0, 0)'};
    --duck-body-color:${localStorage.getItem('--duck-body-color') ?? 'rgb(0, 0, 0)'};
    --duck-wing-color:${localStorage.getItem('--duck-wing-color') ?? 'rgb(0, 0, 0)'};
    --tube-stroke-color:${localStorage.getItem('--tube-stroke-color') ?? 'rgb(0, 0, 0)'};
    --tube-water-color:${localStorage.getItem('--tube-water-color') ?? 'rgb(0, 0, 0)'};
    --wave-front0-color:${localStorage.getItem('--wave-front0-color') ?? 'rgb(0, 0, 0)'};
    --wave-front1-color:${localStorage.getItem('--wave-front1-color') ?? 'rgb(0, 0, 0)'};
    --wave-front2-color:${localStorage.getItem('--wave-front2-color') ?? 'rgb(0, 0, 0)'};
  }`
}
const toggleSidebar = () => {
  document.getElementById('root')!.classList.toggle('move')
  document.getElementById('sidebar-toggler')!.classList.toggle('sidebar-toggler--appear')
  document.getElementById('duck-sidebar')!.classList.toggle('duck--active')
}

const userAgentString = navigator.userAgent
const isSafariAgent = userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1
let willShowSafariPrompt = isSafariAgent && (localStorage.getItem('will-skip-safari-prompt') !== 'true')

function App() {
  const [, triggerReRender] = React.useState({})

// TODO check useImmers
  const [dimensions, setDimensions] = useImmer({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })
  const debouncedDimension = useDebounce<{'height': number, 'width': number}>(dimensions, 1000)

  const [time, setTime] = useImmer<Time>(getInitialTime(localStorage.getItem('time')))
  React.useEffect(() => {
    document.documentElement.setAttribute('time', time)
    localStorage.setItem('time', time)
  },[time])

  const [theme, setTheme] = useImmer<ThemeProps>({
    'base': getInitialThemeBase(localStorage.getItem('theme-base')),
    'supplement': getInitialThemeSupplement(localStorage.getItem('theme-supplement')),
    'custom-base': getInitialThemeBase(localStorage.getItem('theme-custom-base')),
  })

// TODO set type
  const levels = [0, 1, 2, 3]
  const urlAtIndex = ['/about', '/hobby', '/resume', '/settings']

  const currentIndexNoFallback = levels.find(level => window.location.pathname.startsWith(urlAtIndex[level]))
  const currentIndex = currentIndexNoFallback || levels[0]
  const totalPoints = levels.length + 1

  const waveColors = React.useRef<WavesColorsType>(['', '', ''])
  const duckColors = React.useRef<DucksColors>({
    'beak': '',
    'body': '',
    'wing': '',
  })
  const tubeColors = React.useRef<TubesColors>({
    'stroke': '',
    'water' : '',
  })
  const [wavePhysics, setWavePhysics] = useImmer<WavesPhysicsType>({
    'height': 10,
    'speed': window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.05,
    'shakiness': 0,
  })


  const shouldMoveWave = currentIndex === 0 || currentIndex === 1
  const wavesConfig = React.useMemo<WavesConfigsType>(() => {
    const {from, to} = (function(){
      switch(currentIndex) {
        case 0: case 1:
          return {from: {x: 0, y: debouncedDimension.height - 30}, to: {x: debouncedDimension.width, y: debouncedDimension.height - 30}}
        default:
          return {from: {x: 0, y: 120}, to: {x: debouncedDimension.width, y: 200}}
      }
    })()
    return {
      ...wavePhysics,
      'from': from,
      'to': to,
      totalPoints,
      'num': 3,
    }
  // eslint-disable-next-line
  }, [shouldMoveWave, debouncedDimension, wavePhysics.height, wavePhysics.speed, wavePhysics.shakiness, totalPoints])

  React.useEffect(() => {
    const themeSupplementCustomElem = document.createElement('style')
    themeSupplementCustomElem.id = 'theme-custom-supplement'
    document.head.appendChild(themeSupplementCustomElem)
    themeSupplementCustomElem.sheet!.insertRule(getCustomStylesheet(), 0)

    const debouncedHandleResize = () => {
      setDimensions(draft => {
        draft.height = document.documentElement.clientHeight
        draft.width = document.documentElement.clientWidth
      })
    }
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [setDimensions])

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-base', theme.base)

    const hue180     = getComputedStyle(document.documentElement).getPropertyValue('--hue-p180')
    const hue90      = getComputedStyle(document.documentElement).getPropertyValue('--hue-p90')
    const saturation = getComputedStyle(document.documentElement).getPropertyValue('--saturation')
    const favicon = document.getElementById('favicon') as HTMLLinkElement
    favicon.href = `data:image/svg+xml,%3Csvg width='607.3904' height='706.2912' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='matrix(6.0225 0 0 6.7012 -2224.401 -2056.598)' stroke='%23000' stroke-linejoin='round'%3E%3Cpath class='duck__body' d='m443.5 309.9a24 24 0 0 0-23.6 24.3c0 7.7 3.5 14.6 9 19.1a107.6 107.6 0 0 0-24.1 0.6 35.6 35.6 0 0 0-20.4-17.2 46.2 46.2 0 0 0-12 33.3 50.8 50.8 0 0 0 8.6 28.9 83 83 0 0 0 74.7 2.9 45 45 0 0 0 4.9-50.7 24.5 24.5 0 0 0 6.6-16.8 24 24 0 0 0-23.6-24.3z' fill='hsl(${hue180}, ${saturation}, 50%)' stroke-width='6'/%3E%3C/g%3E%3Cg transform='matrix(6.667149 0 0 7.447053 -746.0243 -1506.621)'%3E%3Cg stroke='%23000'%3E%3Cpath class='duck__wing' d='m135.5048 257.7786 7.22847 4.47074-7.33672 3.53354 7.41453 4.90628-6.85445 3.67636c21.73408 8.06733 33.8847 5.97652 32.72092-8.33217-2.34775-9.62604-17.00029-12.53855-33.17275-8.25475z' fill='hsl(${hue90}, ${saturation}, 50%)' stroke-width='2.83885'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A`
  },[theme.base])

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-supplement', theme.supplement)

    const computedRootStyle = getComputedStyle(document.documentElement)
    waveColors.current = [0, 1, 2].map(n => {
      return computedRootStyle.getPropertyValue('--wave-front' + n + '-color')
    })
    duckColors.current = ({
      'beak': computedRootStyle.getPropertyValue('--duck-beak-color'),
      'body': computedRootStyle.getPropertyValue('--duck-body-color'),
      'wing': computedRootStyle.getPropertyValue('--duck-wing-color'),
    })
    tubeColors.current = ({
      'stroke': computedRootStyle.getPropertyValue('--tube-stroke-color'),
      'water' : computedRootStyle.getPropertyValue('--tube-water-color'),
    })
  },[theme.supplement, time])


  const tabIndexDefault: {[level: string]: number}  = {
    '0': parseInt(localStorage.getItem('tabIndexLv0Cur') ?? '0'),
    '1': parseInt(localStorage.getItem('tabIndexLv1Cur') ?? '0'),
  }
  const navItemsAtIndex: {[level: string]: string[]} = {
    '0': ['/Intro', '/WhoIAm', '/WhatIUse', '/Others'],
    '1': ['/Web', '/PC', '/Environment', '/Others'],
  }

  const [navIndexs, setNavIndexs] = useImmer<NavIndexsType>(tabIndexDefault)

  React.useEffect(() => {
    document.getElementById('loading')!.style.display = 'none'
    window.addEventListener('popstate', function() {
      triggerReRender({})

      const currentIndexNoFallback = levels.find(level => window.location.pathname.startsWith(urlAtIndex[level]))
      const currentIndex = currentIndexNoFallback || levels[0]
      if(currentIndex === 2) return

      const newNavIndex = navItemsAtIndex[currentIndex].findIndex(item => window.location.pathname.endsWith(item))
      setNavIndexs(draft => {
        draft[currentIndex] = newNavIndex
      })
    })
  },[])

  if(willShowSafariPrompt){
    return <SafariWarning onclick={() => {willShowSafariPrompt = false; localStorage.setItem('will-skip-safari-prompt', 'true'); triggerReRender({})}} />
  } else {
    return (
      <main id='main' className='main'>
        <Router>
          <Redirect from="/" to={'/about' + navItemsAtIndex[0][tabIndexDefault[0]]} noThrow />
          <Redirect from="/about" to={'/about' + navItemsAtIndex[0][tabIndexDefault[0]]} noThrow />
          <Redirect from="/hobby" to={'/hobby' + navItemsAtIndex[1][tabIndexDefault[1]]} noThrow />
        </Router>
        {getBackground(theme.base)}
        <Canvas argumentCanvas={debouncedDimension} argumentDrawCanvas={{wavesConfig, waveColors}} aria-label='Background Wave' />

        {(currentIndex === 0 || currentIndex === 1) &&
        <NavBar navIndex={navIndexs[currentIndex]} setNavIndexs={setNavIndexs} baseURL={urlAtIndex[currentIndex]} items={navItemsAtIndex[currentIndex]} level={currentIndex} keyOffsets={[0, navItemsAtIndex[0].length]}/>}

        {currentIndex < 2 &&
        <Title className={'title title--' + currentIndex}>
          {navItemsAtIndex[currentIndex][navIndexs[currentIndex]].slice(1)}
        </Title>
        }

        {currentIndex === 2 && <Contact />}
        <Content isInsideWater={currentIndex === 2} />

        {['DuckAboutMe', 'DuckHobby', 'DuckResume'].map((duck, index) =>
        <Duck
          key={index}
          index={index}
          href={urlAtIndex[index]}
          isActive={currentIndex === index}
          shape={duck as DuckShape}
          text={['About', 'Hobby', 'Resume'][index]}
          onclick={() => triggerReRender({})} />
        )}
        <DuckSidebar
          myId='duck-sidebar'
          index={3}
          text='Settings'
          onclick={toggleSidebar} />

        <Sidebar
          wavePhysics={wavePhysics} setWavePhysics={setWavePhysics}
          theme={theme}             setTheme={setTheme}
          time={time}               setTime={setTime}
          duckColors={duckColors}
          tubeColors={tubeColors}
          waveColors={waveColors}
          getCustomStylesheet={getCustomStylesheet}
          toggleSidebar={toggleSidebar} />
      </main>
    )
  }
}

export default App
