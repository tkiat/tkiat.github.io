import React from 'react'
import { useImmer } from 'use-immer'
import { Redirect, Router } from '@reach/router'

import * as Nav from 'ts-type-nav'
import * as Theme from 'ts-type-theme'

import * as data from 'src/appInputs'
import getWaveLine from 'src/@global/getWaveLine'
import * as ts from 'src/@global/utils-typescript'
import useViewportDimensions from 'src/@global/hook/useViewportDimensions'
import injectCustomColors from 'src/@global/injectCustomColors'
import updateFavicon from 'src/@global/updateFavicon'

import Contact from 'src/@global/component/Contact'
import SafariWarning from 'src/@global/component/SafariWarning'
import Title from 'src/@global/component/Title'
import Background from 'src/background/Background'
import Canvas from 'src/canvas/Canvas'
import { Content } from 'src/content/Content'
import NavMain from 'src/nav-main/NavMain'
import NavSub from 'src/nav-sub/NavSub'
import Sidebar from 'src/sidebar/Sidebar'

import 'src/@sass/main.scss'

// TODO explore immutable ts type https://templecoding.com/blog/real-immutable-types-with-typescript

let willShowSafariPrompt = data.isSafariBrowser

const numNavMainButtons = 4
const numPointsOnWave = numNavMainButtons + 1
const numWaves = 3

const App = (): React.ReactElement => {
  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navSubIndexes, setNavSubIndexes] = useImmer<Nav.NavSubIndexes>(data.navSubIndexesInit)
  const [theme, setTheme] = useImmer<Theme.Props>(data.themeInit)
  const [time, setTime] = useImmer<Theme.Time>(data.timeInit)

  const customColors = React.useRef<Theme.CustomColors>({
    'duck-beak': localStorage.getItem('custom-duck-beak-color') ?? 'rgb(0, 0, 0)',
    'duck-body': localStorage.getItem('custom-duck-body-color') ?? 'rgb(0, 0, 0)',
    'duck-wing': localStorage.getItem('custom-duck-wing-color') ?? 'rgb(0, 0, 0)',
    'tube-stroke': localStorage.getItem('custom-tube-stroke-color') ?? 'rgb(0, 0, 0)',
    'tube-water': localStorage.getItem('custom-tube-water-color') ?? 'rgb(0, 0, 0)',
    'wave-front0': localStorage.getItem('custom-wave-front0-color') ?? 'rgb(0, 0, 0)',
    'wave-front1': localStorage.getItem('custom-wave-front1-color') ?? 'rgb(0, 0, 0)',
    'wave-front2': localStorage.getItem('custom-wave-front2-color') ?? 'rgb(0, 0, 0)',
  })
  const navMainIndexRef = React.useRef<Nav.NavMainIndex>(data.navMainIndexInit)
  const waveColors = React.useRef<Theme.WaveColors>(['', '', ''])
  const wavePhysics = React.useRef<Theme.WavePhysics>(data.wavePhysicsInit)

  const cleanupRef = React.useRef<any>(null)
  cleanupRef.current = {
    navSubIndexes: navSubIndexes,
    theme: theme,
    time: time,
  }

  const navMainIndex = navMainIndexRef.current
  const shouldMoveWave = navMainIndex === 0 || navMainIndex === 1
  const waveConfigs = React.useMemo<Theme.WaveConfigs>(() => {
    const { from, to } = getWaveLine(viewportDimensions)[navMainIndex]
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
    injectCustomColors(themeSupplementCustomElem, customColors.current)

    window.addEventListener('popstate', function () {
      const getNavMainIndex = () => {
        const indexes: Nav.NavMainIndex[] = [0, 1, 2]
        return indexes.find((level) => window.location.pathname.startsWith(data.urls.main[level])) || indexes[0]
      }
      const navMainIndexNew = getNavMainIndex()

      navMainIndexRef.current = navMainIndexNew

      if (navMainIndexNew === 0 || navMainIndexNew === 1) {
        const newNavSubIndex = data.urls.sub[navMainIndexNew].findIndex((item) =>
          window.location.pathname.endsWith(item)
        )
        setNavSubIndexes((draft) => {
          draft[navMainIndexNew] = newNavSubIndex
        })
      }
      triggerReRender({})
    })

    const cleanup = () => {
      localStorage.setItem('nav-main-index', navMainIndexRef.current.toString())

      localStorage.setItem('nav-main-index0-sub-index', cleanupRef.current.navSubIndexes[0].toString())
      localStorage.setItem('nav-main-index1-sub-index', cleanupRef.current.navSubIndexes[1].toString())

      localStorage.setItem('theme-base', cleanupRef.current.theme.base)
      localStorage.setItem('theme-supplement', cleanupRef.current.theme.supplement)
      localStorage.setItem('theme-custom-base', cleanupRef.current.theme['custom-base'])

      localStorage.setItem('time', cleanupRef.current.time)

      localStorage.setItem('wave-height', wavePhysics.current.height.toString())
      localStorage.setItem('wave-speed', wavePhysics.current.speed.toString())
      localStorage.setItem('wave-shakiness', wavePhysics.current.shakiness.toString())

      Object.keys(customColors.current).forEach((prop) => {
        localStorage.setItem('custom-' + prop + '-color', customColors.current[prop as keyof Theme.CustomColors])
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

  const navMainItem = data.urls.main[navMainIndex]
  const navMainItemLv0 = data.urls.main[0]
  const navMainItemLv1 = data.urls.main[1]

  const navSubIndexesPossible: Extract<Nav.NavMainIndex, 0 | 1>[] = [0, 1]
  const navMainIndexSub = ts.isType(navMainIndex, navSubIndexesPossible) ? navMainIndex : null

  const navSubIndex = navMainIndexSub !== null ? navSubIndexes[navMainIndexSub] : null
  const navSubItems = navMainIndexSub !== null ? data.urls.sub[navMainIndexSub] : null
  const navSubItem = navSubItems !== null && navSubIndex !== null ? navSubItems[navSubIndex] : null
  const navSubItemLv0 = data.urls.sub[0][navSubIndexes[0]]
  const navSubItemLv1 = data.urls.sub[1][navSubIndexes[1]]

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
          <Redirect from="/" to={navMainItem} noThrow />
          <Redirect from={navMainItemLv0} to={navMainItemLv0 + navSubItemLv0} noThrow />
          <Redirect from={navMainItemLv1} to={navMainItemLv1 + navSubItemLv1} noThrow />
        </Router>

        <Contact navMainIndex={navMainIndex} />
        <Title className={'title title--' + navMainIndex} title={navSubItem !== null ? navSubItem.slice(1) : ''} />

        <Background theme={theme.base} />
        <Canvas
          argumentCanvas={viewportDimensions}
          argumentDrawCanvas={{ waveConfigs, waveColors, wavePhysics }}
          aria-label="Background Wave"
        />
        <Content isInsideWater={navMainIndex === 2} />
        <NavMain navMainIndexRef={navMainIndexRef} rerender={() => triggerReRender({})} urlAtIndex={data.urls.main} />
        {navMainIndexSub !== null && navSubIndex !== null && navSubItems !== null && (
          <NavSub
            navSubIndex={navSubIndex}
            setNavSubIndexes={setNavSubIndexes}
            navMainItem={navMainItem}
            navSubItems={navSubItems}
            navMainIndex={navMainIndexSub}
            keyOffsets={[0, data.urls.sub[0].length]}
          />
        )}
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
