import React from 'react'
import { useImmer } from 'use-immer'
import { Redirect, Router } from '@reach/router'

import * as Nav from 'ts-type-nav'
import * as Theme from 'ts-type-theme'

import initData from 'src/appData'
import getWaveLine from 'src/canvas/wave/getWaveLine'
import * as ts from 'src/@global/utils-typescript'
import useViewportDimensions from 'src/@global/hook/useViewportDimensions'
import injectCustomColors from 'src/@global/injectCustomColors'
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

// TODO change body-text-color to more semantic like content-text-color
// TODO test once tabscontent
// TODO https://github.com/rollup/plugins/tree/master/packages/yaml

let willShowSafariPrompt = initData.isSafariBrowser

const numNavMainButtons = 4
const numPointsOnWave = numNavMainButtons + 1
const numWaves = 3

const App = (): React.ReactElement => {
  const [, triggerReRender] = React.useState({})

  const viewportDimensions = useViewportDimensions(500)

  const [navSubIndexes, setNavSubIndexes] = useImmer<Nav.NavSubIndexes>(initData.navSubIndexesInit)
  const [theme, setTheme] = useImmer<Theme.Props>(initData.themeInit)
  const [time, setTime] = useImmer<Theme.Time>(initData.timeInit)

  const customColors = React.useRef<Theme.CustomColors>(
    Object.fromEntries(
      ts.possible.customColors.map((x) => [x, localStorage.getItem('custom-' + x + '-color') ?? 'rgb(0, 0, 0)'])
    ) as Theme.CustomColors
  )
  const navMainIndexRef = React.useRef<Nav.NavMainIndex>(initData.navMainIndexInit)
  const waveColors = React.useRef<Theme.WaveColors>(['', '', ''])
  const wavePhysics = React.useRef<Theme.WavePhysics>(initData.wavePhysicsInit)

  type Cleanup = {
    navSubIndexes: Nav.NavSubIndexes
    theme: Theme.Props
    time: Theme.Time
  }
  const cleanupRef = React.useRef<Cleanup>({
    navSubIndexes: navSubIndexes,
    theme: theme,
    time: time,
  })
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

    const adjustNavIndexesFromUrl = () => {
      const getNavMainIndexFromUrl = (indexes: Nav.NavMainIndex[], urls: Nav.UrlMain) => {
        return indexes.find((index) => window.location.pathname.startsWith(urls[index]))
      }
      const getNavSubIndexFromUrl = (urls: readonly string[]) => {
        return urls.findIndex((item) => window.location.pathname.endsWith(item))
      }

      const main = getNavMainIndexFromUrl(ts.possible.navMainIndexes, initData.urls.main)
      if (main !== undefined) {
        navMainIndexRef.current = main
        if (ts.isType(main, ts.possible.navSubIndexes)) {
          const sub = getNavSubIndexFromUrl(initData.urls.sub[main])
          if (sub !== -1) {
            setNavSubIndexes((draft) => {
              draft[main] = sub
            })
          }
        }
      }
      triggerReRender({})
    }
    window.addEventListener('popstate', adjustNavIndexesFromUrl)

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

      Object.keys(customColors.current).map((prop) => {
        localStorage.setItem('custom-' + prop + '-color', customColors.current[prop as keyof Theme.CustomColors])
      })
    }
    window.addEventListener('beforeunload', cleanup)
    return () => {
      window.removeEventListener('beforeunload', cleanup)
      window.removeEventListener('popstate', adjustNavIndexesFromUrl)
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

  const navMainItem = initData.urls.main[navMainIndex]
  const navMainItemLv0 = initData.urls.main[0]
  const navMainItemLv1 = initData.urls.main[1]

  const navMainIndexSub = ts.isType(navMainIndex, ts.possible.navSubIndexes) ? navMainIndex : null

  const navSubIndex = navMainIndexSub !== null ? navSubIndexes[navMainIndexSub] : null
  const navSubItems = navMainIndexSub !== null ? initData.urls.sub[navMainIndexSub] : null
  const navSubItem = navSubItems !== null && navSubIndex !== null ? navSubItems[navSubIndex] : null
  const navSubItemLv0 = initData.urls.sub[0][navSubIndexes[0]]
  const navSubItemLv1 = initData.urls.sub[1][navSubIndexes[1]]

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
        <NavMain
          navMainIndexRef={navMainIndexRef}
          rerender={() => triggerReRender({})}
          navMainItems={initData.urls.main}
        />
        {navMainIndexSub !== null && navSubIndex !== null && navSubItems !== null && (
          <NavSub
            navSubIndex={navSubIndex}
            setNavSubIndexes={setNavSubIndexes}
            navMainItem={navMainItem}
            navSubItems={navSubItems}
            navMainIndex={navMainIndexSub}
            keyOffsets={[0, initData.urls.sub[0].length]}
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
