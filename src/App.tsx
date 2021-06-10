import React from 'react'
import { useImmer } from 'use-immer'
import { Redirect, Router } from '@reach/router'

import { NavMainIndex, NavSubIndexes } from 'my-nav-type'
import { DuckColors, ThemeProps, Time, TubesColors, WavesColors, WavesConfigs, WavesPhysics } from 'my-theme-type'

import * as data from 'src/@global/defaultValues'
import getWaveLine from 'src/@global/getWaveLine'
import useViewportDimensions from 'src/@global/hook/useViewportDimensions'
import injectCustomTheme from 'src/@global/injectCustomTheme'
import updateFavicon from 'src/@global/updateFavicon'

import Contact from 'src/@global/component/Contact'
import SafariWarning from 'src/@global/component/SafariWarning'
import Title from 'src/@global/component/Title'
import Background from 'src/background/Background'
import Canvas from 'src/canvas/Canvas'
import Content from 'src/content/Content'
import NavMain from 'src/nav-main/NavMain'
import NavSub from 'src/nav-sub/NavSub'
import Sidebar from 'src/sidebar/Sidebar'

import 'src/@sass/main.scss'

let willShowSafariPrompt = data.isSafariBrowser

const getNavMainIndex = () => {
  const indexes: NavMainIndex[] = [0, 1, 2]
  return indexes.find((level) => window.location.pathname.startsWith(data.urls.main[level])) || indexes[0]
}
const numNavMainButton = 4
const numPointsOnWave = numNavMainButton + 1
const numWaves = 3

const App = (): React.ReactElement => {
  const navMainIndex = React.useRef<NavMainIndex>(data.navMainIndexInit)
  navMainIndex.current = getNavMainIndex()

  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navSubIndexes, setNavSubIndexes] = useImmer<NavSubIndexes>(data.navSubIndexesInit)

  const navSubIndexesRef = React.useRef<NavSubIndexes>(data.navSubIndexesInit)
  navSubIndexesRef.current = navSubIndexes

  const [theme, setTheme] = useImmer<ThemeProps>(data.themeInit)
  const [time, setTime] = useImmer<Time>(data.timeInit)
  const [wavePhysics, setWavePhysics] = useImmer<WavesPhysics>(data.wavePhysicsInit)

  const themeRef = React.useRef<ThemeProps>(data.themeInit)
  themeRef.current = theme

  const timeRef = React.useRef<Time>(data.timeInit)
  timeRef.current = time

  const wavePhysicsRef = React.useRef<WavesPhysics>(data.wavePhysicsInit)
  wavePhysicsRef.current = wavePhysics

  const duckColors = React.useRef<DuckColors>({
    beak: '',
    body: '',
    wing: '',
  })
  const tubeColors = React.useRef<TubesColors>({
    stroke: '',
    water: '',
  })
  const waveColors = React.useRef<WavesColors>(['', '', ''])

  const getLocalColor = (item: string) => localStorage.getItem(item) ?? 'rgb(0, 0, 0)'
  const customThemeRef = React.useRef<any>({
    'duck-beak-color': getLocalColor('custom-duck-beak-color'),
    'duck-body-color': getLocalColor('custom-duck-body-color'),
    'duck-wing-color': getLocalColor('custom-duck-wing-color'),
    'tube-stroke-color': getLocalColor('custom-tube-stroke-color'),
    'tube-water-color': getLocalColor('custom-tube-water-color'),
    'wave-front0-color': getLocalColor('custom-wave-front0-color'),
    'wave-front1-color': getLocalColor('custom-wave-front1-color'),
    'wave-front2-color': getLocalColor('custom-wave-front2-color'),
  })

  const shouldMoveWave = navMainIndex.current === 0 || navMainIndex.current === 1
  const wavesConfig = React.useMemo<WavesConfigs>(() => {
    const { from, to } = getWaveLine(viewportDimensions)[navMainIndex.current]
    return {
      from: from,
      to: to,
      totalPoints: numPointsOnWave,
      num: numWaves,
    }
  }, [shouldMoveWave, viewportDimensions, numPointsOnWave])

  React.useEffect(() => {
    document.getElementById('loading')!.style.display = 'none'

    const themeSupplementCustomElem = document.createElement('style')
    themeSupplementCustomElem.id = 'theme-custom-supplement'
    document.head.appendChild(themeSupplementCustomElem)
    injectCustomTheme(themeSupplementCustomElem, customThemeRef.current)

    window.addEventListener('popstate', function () {
      triggerReRender({})

      const navMainIndexNew = getNavMainIndex()
      if (navMainIndexNew === 0 || navMainIndexNew === 1) {
        const newNavSubIndex = data.urls.sub[navMainIndexNew].findIndex((item) =>
          window.location.pathname.endsWith(item)
        )
        setNavSubIndexes((draft) => {
          draft[navMainIndexNew] = newNavSubIndex
        })
      }
    })

    const cleanup = () => {
      localStorage.setItem('nav-main-index', navMainIndex.current.toString())
      localStorage.setItem('nav-main-index0-sub-index', navSubIndexesRef.current[0].toString())
      localStorage.setItem('nav-main-index1-sub-index', navSubIndexesRef.current[1].toString())

      localStorage.setItem('theme-base', themeRef.current.base)
      localStorage.setItem('theme-supplement', themeRef.current.supplement)
      localStorage.setItem('theme-custom-base', themeRef.current['custom-base'])

      localStorage.setItem('time', timeRef.current)

      localStorage.setItem('wave-height', wavePhysicsRef.current.height.toString())
      localStorage.setItem('wave-speed', wavePhysicsRef.current.speed.toString())
      localStorage.setItem('wave-shakiness', wavePhysicsRef.current.shakiness.toString())

      Object.keys(customThemeRef.current).forEach((prop) => {
        localStorage.setItem('custom-' + prop, customThemeRef.current[prop])
      })
    }
    window.addEventListener('beforeunload', cleanup)
    return () => {
      window.removeEventListener('beforeunload', cleanup)
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-base', theme.base)
    updateFavicon()
  }, [theme.base])

  React.useEffect(() => {
    document.documentElement.setAttribute('time', time)
  }, [time])

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-supplement', theme.supplement)

    const computedRootStyle = getComputedStyle(document.documentElement)
    waveColors.current = [0, 1, 2].map((n) => {
      return computedRootStyle.getPropertyValue('--wave-front' + n + '-color')
    })
    duckColors.current = {
      beak: computedRootStyle.getPropertyValue('--duck-beak-color'),
      body: computedRootStyle.getPropertyValue('--duck-body-color'),
      wing: computedRootStyle.getPropertyValue('--duck-wing-color'),
    }
    tubeColors.current = {
      stroke: computedRootStyle.getPropertyValue('--tube-stroke-color'),
      water: computedRootStyle.getPropertyValue('--tube-water-color'),
    }
  }, [theme.supplement, time])

  if (willShowSafariPrompt) {
    return (
      <SafariWarning
        onclick={() => {
          willShowSafariPrompt = false
          localStorage.setItem('will-skip-safari-prompt', 'true')
          triggerReRender({})
        }}
      />
    )
  } else {
    return (
      <main id="main" className="main">
        <Router>
          <Redirect from="/" to={'/about' + data.urls.sub[0][data.navSubIndexesInit[0]]} noThrow />
          <Redirect from="/about" to={'/about' + data.urls.sub[0][data.navSubIndexesInit[0]]} noThrow />
          <Redirect from="/hobby" to={'/hobby' + data.urls.sub[1][data.navSubIndexesInit[1]]} noThrow />
        </Router>

        <Contact navMainIndex={navMainIndex.current} />
        <Title
          navSubIndex={navSubIndexes[navMainIndex.current]}
          items={data.urls.sub[navMainIndex.current]}
          navMainIndex={navMainIndex.current}
        />

        <Background theme={theme.base} />
        <Canvas
          argumentCanvas={viewportDimensions}
          argumentDrawCanvas={{ wavesConfig, waveColors, wavePhysics }}
          aria-label="Background Wave"
        />
        <Content isInsideWater={navMainIndex.current === 2} />
        <NavMain navMainIndex={navMainIndex.current} onclick={() => triggerReRender({})} urlAtIndex={data.urls.main} />
        <NavSub
          navSubIndex={navSubIndexes[navMainIndex.current]}
          setNavSubIndexes={setNavSubIndexes}
          baseURL={data.urls.main[navMainIndex.current]}
          items={data.urls.sub[navMainIndex.current]}
          navMainIndex={navMainIndex.current}
          keyOffsets={[0, data.urls.sub[0].length]}
        />
        <Sidebar
          customThemeRef={customThemeRef}
          wavePhysics={wavePhysics}
          setWavePhysics={setWavePhysics}
          theme={theme}
          setTheme={setTheme}
          time={time}
          setTime={setTime}
          duckColors={duckColors}
          tubeColors={tubeColors}
          waveColors={waveColors}
        />
      </main>
    )
  }
}

export default App
