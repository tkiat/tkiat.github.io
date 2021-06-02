import React from 'react'
import {useImmer} from 'use-immer'
import {Redirect, Router} from "@reach/router"

import {DuckColors, DuckShape} from 'my-duck-type'
import {NavIndexsType} from 'my-nav-type'
import {ThemeProps} from 'my-theme-type'
import {Time} from 'my-time-type'
import {TubesColors} from 'my-tube-type'
import {WavesColors, WavesConfigs, WavesPhysics} from 'my-wave-config-type'

import updateFavicon from 'src/assets/updateFavicon'
import {initialThemes, initialTime, isSafariBrowser} from 'src/defaultValues'
import useViewportDimensions from 'src/hook/useViewportDimensions'
import injectCustomTheme from 'src/injectCustomTheme'
import toggleSidebar from 'src/settings/toggleSidebar'

import Background    from 'src/assets/background/Background'
import Canvas        from 'src/canvas/Canvas'
import Contact       from 'src/content/resume/Contact'
import Sidebar       from 'src/settings/Sidebar'
import Title         from 'src/content/Title'
import Duck          from 'src/duck/Duck'
import DuckSidebar   from 'src/duck/DuckSidebar'
import NavBar        from 'src/navbar/NavBar'
import Content       from 'src/router/Content'
import SafariWarning from 'src/SafariWarning'
import './sass/main.scss'

const levels = [0, 1, 2, 3]
const navItemsAtIndex: {[level: string]: string[]} = {
  '0': ['/Intro', '/Personality', '/Record', '/Credits'],
  '1': ['/Web', '/PC', '/Environment', '/Others'],
}
const numWaves = 3
const urlAtIndex = ['/about', '/hobby', '/resume', '/settings']

const totalPoints = levels.length + 1
let willShowSafariPrompt = isSafariBrowser

function App(): React.ReactElement {

  const tabIndexDefault: {[level: string]: number}  = {
    '0': parseInt(localStorage.getItem('tabIndexLv0Cur') ?? '0'),
    '1': parseInt(localStorage.getItem('tabIndexLv1Cur') ?? '0'),
  }

  const currentIndex = levels.find(level => window.location.pathname.startsWith(urlAtIndex[level])) || levels[0]
  const shouldMoveWave = currentIndex === 0 || currentIndex === 1

  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navIndexs, setNavIndexs]     = useImmer<NavIndexsType>(tabIndexDefault)
  const [theme, setTheme]             = useImmer<ThemeProps>(initialThemes)
  const [time, setTime]               = useImmer<Time>(initialTime)
  const [wavePhysics, setWavePhysics] = useImmer<WavesPhysics>({
    'height': 10,
    'speed': window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.05,
    'shakiness': 0,
  })

  const duckColors = React.useRef<DuckColors>({
    'beak': '',
    'body': '',
    'wing': '',
  })
  const tubeColors = React.useRef<TubesColors>({
    'stroke': '',
    'water' : '',
  })
  const waveColors = React.useRef<WavesColors>(['', '', ''])

  const wavesConfig = React.useMemo<WavesConfigs>(() => {
    const {from, to} = (function(){
      switch(currentIndex) {
        case 0: case 1:
          return {from: {x: 0, y: viewportDimensions.height - 30}, to: {x: viewportDimensions.width, y: viewportDimensions.height - 30}}
        default:
          return {from: {x: 0, y: 120}, to: {x: viewportDimensions.width, y: 200}}
      }
    })()
    return {
      ...wavePhysics,
      'from': from,
      'to': to,
      totalPoints,
      'num': numWaves,
    }
  // eslint-disable-next-line
  }, [shouldMoveWave, viewportDimensions, wavePhysics.height, wavePhysics.speed, wavePhysics.shakiness, totalPoints])

  React.useEffect(() => {
    document.getElementById('loading')!.style.display = 'none'

    const themeSupplementCustomElem = document.createElement('style')
    themeSupplementCustomElem.id = 'theme-custom-supplement'
    document.head.appendChild(themeSupplementCustomElem)
    injectCustomTheme(themeSupplementCustomElem)

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

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-base', theme.base)
    updateFavicon()
  },[theme.base])

  React.useEffect(() => {
    document.documentElement.setAttribute('time', time)
    localStorage.setItem('time', time)
  },[time])

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
        <Background theme={theme.base} />
        <Canvas argumentCanvas={viewportDimensions} argumentDrawCanvas={{wavesConfig, waveColors}} aria-label='Background Wave' />

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
          injectCustomTheme={injectCustomTheme}
          toggleSidebar={toggleSidebar} />
      </main>
    )
  }
}

export default App
