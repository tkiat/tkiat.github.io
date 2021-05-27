import React from 'react'
import {useImmer} from 'use-immer'
import {Redirect, Router} from "@reach/router"
import {navIndexsType} from "my-nav-type"

import Content       from './content/Content'
import NavBar        from './navbar/NavBar'
import Contact       from './content/Contact'
import Title         from './content/Title'
import Canvas        from './canvas/Canvas'
import SafariWarning from './SafariWarning'
import useDebounce   from './hook-custom/useDebounce'
import Sidebar       from './content/Sidebar'
import Duck          from './duck/Duck'
import DuckSidebar   from './duck/DuckSidebar'

import {ReactComponent as Desert} from '@/background/desert.svg'
import {ReactComponent as Ocean}  from '@/background/ocean.svg'
import {ReactComponent as Sakura} from '@/background/sakura.svg'
import {ReactComponent as Snow}   from '@/background/snow.svg'

import './sass/main.scss'

// TODO try to make readnme more visual and less verbose
// TODO in projects show keyword tooltip instead
// TODO what if in project we add another navbar left sidebar and show project on the right
// TODO do anim project https://lihautan.com/blogs/
// TODO stop compute duck if speed none
// TODO stop compute wave if height none
// TODO typescript remove any

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
const timeFallback = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'day'
const themeFallback = 'sakura'
const toggleSidebar = () => {
  document.getElementById('root')!.classList.toggle('move')
  document.getElementById('sidebar-toggler')!.classList.toggle('sidebar-toggler--appear')
  document.getElementById('duck-sidebar')!.classList.toggle('duck--active')
}

const userAgentString = navigator.userAgent
const isSafariAgent = userAgentString.indexOf("Safari") > -1 && userAgentString.indexOf("Chrome") === -1
let willShowSafariPrompt = isSafariAgent && (localStorage.getItem('will-skip-safari-prompt') !== "true")

function App() {
  const [, triggerReRender] = React.useState({})

  const [dimensions, setDimensions] = useImmer({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })
  const debouncedDimension = useDebounce(dimensions, 1000)

  const [time, setTime] = useImmer(localStorage.getItem('time') ?? timeFallback)
  React.useEffect(() => {
    document.documentElement.setAttribute('time', time)
    localStorage.setItem('time', time)
  },[time])

  const [theme, setTheme] = useImmer({
    'base': localStorage.getItem('theme-base') ?? themeFallback,
    'supplement': localStorage.getItem('theme-supplement') ?? themeFallback,
    'custom-base': localStorage.getItem('theme-custom-base') ?? themeFallback,
  })

  const levels = [0, 1, 2, 3]
  const urlAtIndex = ['/about', '/hobby', '/resume', '/settings']

  const currentIndexNoFallback = levels.find(level => window.location.pathname.startsWith(urlAtIndex[level]))
  const currentIndex = currentIndexNoFallback || levels[0]
  const totalPoints = levels.length + 1

  const waveColors = React.useRef(['', '', ''])
  const duckColors = React.useRef({
    'beak': '',
    'body': '',
    'wing': '',
  })
  const tubeColors = React.useRef({
    'stroke': '',
    'water' : '',
  })
  const [wavePhysics, setWavePhysics] = useImmer({
    'height': 10,
    'speed': window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.05,
    'shakiness': 0,
  })


  const shouldMoveWave = currentIndex === 0 || currentIndex === 1
  const wavesConfig = React.useMemo(() => {
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

  const [navIndexs, setNavIndexs] = useImmer<navIndexsType>(tabIndexDefault)

  React.useEffect(() => {
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
    <>
      <main id='main' className='main'>
        <Router>
          <Redirect from="/" to={'/about' + navItemsAtIndex[0][tabIndexDefault[0]]} noThrow />
          <Redirect from="/about" to={'/about' + navItemsAtIndex[0][tabIndexDefault[0]]} noThrow />
          <Redirect from="/hobby" to={'/hobby' + navItemsAtIndex[1][tabIndexDefault[1]]} noThrow />
        </Router>
        {getBackground(theme.base)}
        <Canvas argumentCanvas={debouncedDimension} argumentDrawCanvas={{wavesConfig, waveColors}} aria-label='Background Wave' />

        {(currentIndex === 0 || currentIndex === 1) &&
        <NavBar navIndex={navIndexs[currentIndex]} setNavIndexs={setNavIndexs} baseURL={urlAtIndex[currentIndex]} items={navItemsAtIndex[currentIndex]} level={currentIndex} keyOffsets={[0, navItemsAtIndex[0].length]}/>
        }

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
          shape={duck}
          text={['About', 'Hobby', 'Resume'][index]}
          onclick={() => triggerReRender({})} />
        )}
        <DuckSidebar
          myId='duck-sidebar'
          index={3}
          shape='DuckSidebar'
          text='Settings'
          toggleSidebar={toggleSidebar} />

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
    </>
    )
  }
}

export default App
