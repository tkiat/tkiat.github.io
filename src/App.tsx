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

// TODO add wave height o localstorage and apply it at init
// TODO save everyhing beforeunload to lcoalstorage in App.tsx
// TODO in nav setocalstorage only when cleanup, this can probably custom hook for curRef - put curRef inside setState hook

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
  const shouldMoveWave = navMainIndex.current === 0 || navMainIndex.current === 1

  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navSubIndexs, setNavSubIndexs] = useImmer<NavSubIndexes>(data.navSubIndexesInit)
  const [theme, setTheme] = useImmer<ThemeProps>(data.themeInit)
  const [time, setTime] = useImmer<Time>(data.timeInit)
  const [wavePhysics, setWavePhysics] = useImmer<WavesPhysics>(data.wavePhysicsInit)

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
    injectCustomTheme(themeSupplementCustomElem)

    window.addEventListener('popstate', function () {
      triggerReRender({})

      const navMainIndexNew = getNavMainIndex()
      if (navMainIndexNew === 0 || navMainIndexNew === 1) {
        const newNavSubIndex = data.urls.sub[navMainIndexNew].findIndex((item) =>
          window.location.pathname.endsWith(item)
        )
        setNavSubIndexs((draft) => {
          draft[navMainIndexNew] = newNavSubIndex
        })
      }
    })

    const cleanup = () => {
      const navSubIndex = navSubIndexs[navMainIndex.current]
      // localStorage.setItem('noob', navSubIndex?.toString())
      localStorage.setItem('noob', new Date().toString())
      if (typeof navSubIndex === 'number')
        localStorage.setItem('nav-main-index' + navMainIndex.current + '-sub-index', navSubIndex.toString())

      localStorage.setItem('nav-main-index', navMainIndex.current.toString())
    }
    window.addEventListener('beforeunload', cleanup)
    return () => {
      // cleanup()
      window.removeEventListener('beforeunload', cleanup)
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute('theme-base', theme.base)
    updateFavicon()
  }, [theme.base])

  React.useEffect(() => {
    document.documentElement.setAttribute('time', time)
    localStorage.setItem('time', time)
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
          navSubIndex={navSubIndexs[navMainIndex.current]}
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
          navSubIndex={navSubIndexs[navMainIndex.current]}
          setNavSubIndexs={setNavSubIndexs}
          baseURL={data.urls.main[navMainIndex.current]}
          items={data.urls.sub[navMainIndex.current]}
          navMainIndex={navMainIndex.current}
          keyOffsets={[0, data.urls.sub[0].length]}
        />
        <Sidebar
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
