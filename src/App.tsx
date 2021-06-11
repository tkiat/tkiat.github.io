import React from 'react'
import { useImmer } from 'use-immer'
import { Redirect, Router } from '@reach/router'

import { NavMainIndex, NavSubIndexes } from 'my-nav-type'
import { CustomColors, ThemeProps, Time, WaveColors, WaveConfigs, WavePhysics } from 'my-theme-type'

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

// TODO remove redundant useState and ref to only ref except wavephysics, probably use context ref with useCallback https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

let willShowSafariPrompt = data.isSafariBrowser

const getNavMainIndex = () => {
  const indexes: NavMainIndex[] = [0, 1, 2]
  return indexes.find((level) => window.location.pathname.startsWith(data.urls.main[level])) || indexes[0]
}
const numNavMainButton = 4
const numPointsOnWave = numNavMainButton + 1
const numWaves = 3

const App = (): React.ReactElement => {
  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navSubIndexes, setNavSubIndexes] = useImmer<NavSubIndexes>(data.navSubIndexesInit)
  const [theme, setTheme] = useImmer<ThemeProps>(data.themeInit)
  const [time, setTime] = useImmer<Time>(data.timeInit)

  const customColors = React.useRef<CustomColors>({
    'duck-beak': localStorage.getItem('custom-duck-beak-color') ?? 'rgb(0, 0, 0)',
    'duck-body': localStorage.getItem('custom-duck-body-color') ?? 'rgb(0, 0, 0)',
    'duck-wing': localStorage.getItem('custom-duck-wing-color') ?? 'rgb(0, 0, 0)',
    'tube-stroke': localStorage.getItem('custom-tube-stroke-color') ?? 'rgb(0, 0, 0)',
    'tube-water': localStorage.getItem('custom-tube-water-color') ?? 'rgb(0, 0, 0)',
    'wave-front0': localStorage.getItem('custom-wave-front0-color') ?? 'rgb(0, 0, 0)',
    'wave-front1': localStorage.getItem('custom-wave-front1-color') ?? 'rgb(0, 0, 0)',
    'wave-front2': localStorage.getItem('custom-wave-front2-color') ?? 'rgb(0, 0, 0)',
  })
  const navMainIndex = React.useRef<NavMainIndex>(data.navMainIndexInit)
  const waveColors = React.useRef<WaveColors>(['', '', ''])
  const wavePhysics = React.useRef<WavePhysics>(data.wavePhysicsInit)

  const cleanupRef = React.useRef<any>(null)
  cleanupRef.current = {
    navSubIndexes: navSubIndexes,
    theme: theme,
    time: time,
    // wavePhysics: wavePhysics,
  }

  const shouldMoveWave = navMainIndex.current === 0 || navMainIndex.current === 1
  const waveConfigs = React.useMemo<WaveConfigs>(() => {
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
    injectCustomTheme(themeSupplementCustomElem, customColors.current)

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

      localStorage.setItem('nav-main-index0-sub-index', cleanupRef.current.navSubIndexes[0].toString())
      localStorage.setItem('nav-main-index1-sub-index', cleanupRef.current.navSubIndexes[1].toString())

      localStorage.setItem('theme-base', cleanupRef.current.theme.base)
      localStorage.setItem('theme-supplement', cleanupRef.current.theme.supplement)
      localStorage.setItem('theme-custom-base', cleanupRef.current.theme['custom-base'])

      localStorage.setItem('time', cleanupRef.current.time)

      localStorage.setItem('wave-height', wavePhysics.current.height.toString())
      localStorage.setItem('wave-speed', wavePhysics.current.speed.toString())
      localStorage.setItem('wave-shakiness', wavePhysics.current.shakiness.toString())
      //       localStorage.setItem('wave-height', cleanupRef.current.wavePhysics.height.toString())
      //       localStorage.setItem('wave-speed', cleanupRef.current.wavePhysics.speed.toString())
      //       localStorage.setItem('wave-shakiness', cleanupRef.current.wavePhysics.shakiness.toString())

      Object.keys(customColors.current).forEach((prop) => {
        localStorage.setItem('custom-' + prop + '-color', customColors.current[prop as keyof CustomColors])
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
          argumentDrawCanvas={{ waveConfigs, waveColors, wavePhysics }}
          aria-label="Background Wave"
        />
        <Content isInsideWater={navMainIndex.current === 2} />
        <NavMain navMainIndex={navMainIndex} rerender={() => triggerReRender({})} urlAtIndex={data.urls.main} />
        <NavSub
          navSubIndex={navSubIndexes[navMainIndex.current]}
          setNavSubIndexes={setNavSubIndexes}
          baseURL={data.urls.main[navMainIndex.current]}
          items={data.urls.sub[navMainIndex.current]}
          navMainIndex={navMainIndex.current}
          keyOffsets={[0, data.urls.sub[0].length]}
        />
        <Sidebar
          customColors={customColors}
          wavePhysics={wavePhysics}
          theme={theme}
          setTheme={setTheme}
          time={time}
          setTime={setTime}
          waveColors={waveColors}
        />
      </main>
    )
  }
}

export default App
