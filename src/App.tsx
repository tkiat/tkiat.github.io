import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
// import {useRoutes, useRedirect} from 'hookrouter'
import {useImmer} from 'use-immer'
import {Route, useRoute} from "wouter"

import Content          from '@/content/Content'
import About          from '@/content/About'
import Hobby          from '@/content/Hobby'
import Resume          from '@/content/Resume'

import NavBar        from '@/navbar/NavBar'
import Contact       from '@/content/Contact'
import Title         from '@/content/Title'
import Canvas        from '@/canvas/Canvas'
import Loading       from '@/Loading'
import NotFound      from '@/NotFound'
import SafariWarning from '@/SafariWarning'
import useDebounce   from '@/hook-custom/useDebounce'
// import getMainRoutes from '@/router/getMainRoutes'
import Sidebar       from '@/content/Sidebar'
import Duck          from '@/duck/Duck'
import DuckSidebar   from '@/duck/DuckSidebar'

import {ReactComponent as Desert} from '@/background/desert.svg'
import {ReactComponent as Ocean}  from '@/background/ocean.svg'
import {ReactComponent as Sakura} from '@/background/sakura.svg'
import {ReactComponent as Snow}   from '@/background/snow.svg'

import './sass/main.scss'

// TODO try remove React above
// TODO try to make readnme more visual and less verbose
// TODO in projects show keyword tooltip instead
// TODO what if in project we add another navbar left sidebar and show project on the right
// TODO do anim project https://lihautan.com/blogs/
// TODO stop compute duck if speed none
// TODO stop compute wave if height none
// TODO typescript remove any

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

const routes = {
  '/about*': () => () => 
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>,
  '/hobby*': () => () =>
      <Suspense fallback={<Loading />}>
        <Hobby />
      </Suspense>,
  '/resume': () => () =>
      <Suspense fallback={<Loading />}>
        <Resume />
      </Suspense>,
}

function App() {
  const [, triggerReRender] = useState({})

  const [dimensions, setDimensions] = useImmer({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })
  const debouncedDimension = useDebounce(dimensions, 1000)

  const [time, setTime] = useImmer(localStorage.getItem('time') ?? timeFallback)
  useEffect(() => {
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

  const currentIndex = levels.find(level => window.location.pathname.startsWith(urlAtIndex[level])) || levels[0]
  const totalPoints = levels.length + 1

  const waveColors = useRef(['', '', ''])
  const duckColors = useRef({
    'beak': '',
    'body': '',
    'wing': '',
  })
  const tubeColors = useRef({
    'stroke': '',
    'water' : '',
  })
  const [wavePhysics, setWavePhysics] = useImmer({
    'height': 10,
    'speed': window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.05,
    'shakiness': 0,
  })


  const shouldMoveWave = currentIndex === 0 || currentIndex === 1
  const wavesConfig = useMemo(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    document.documentElement.setAttribute('theme-base', theme.base)
  },[theme.base])

  useEffect(() => {
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

  const tabIndexDefault = {
    0: parseInt(localStorage.getItem('tabIndexLv0Cur') ?? '0'),
    1: parseInt(localStorage.getItem('tabIndexLv1Cur') ?? '0'),
  }
  const navItemsAtIndex = {
    0: ['/intro', '/whoiam', '/whatiuse', '/others'],
    1: ['/web', '/pc', '/environment', '/others'],
//     0: ['/Intro', '/WhoIAm', '/WhatIUse', '/Others'],
//     1: ['/Web', '/PC', '/Environment', '/Others'],
  }

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

//   useRedirect('/', '/about')
//   useRedirect('/about', '/about'       + navItemsAtIndex[0][tabIndexDefault[0]])
//   useRedirect('/hobby', '/hobby' + navItemsAtIndex[1][tabIndexDefault[1]])

  // const routeResult = useRoutes(routes)
  console.log(5)
//   const temp = {
//     0: ['intro', 'whoiam', 'whatiuse', 'others'],
//     1: ['web', 'pc', 'environment', 'others'],
//   }

  // const url = window.location.pathname
  const urls = window.location.pathname.slice(1).split('/')
  const urlMain = urls[0]
  const urlSub  = urls[1]
  console.log(urlMain, urlSub)

  if(urlMain === '' && urlSub === undefined) {
    history.pushState(null, null, '/about/intro')
  } else if (urlMain === 'about' && urlSub === undefined) {
    history.pushState(null, null, '/about' + navItemsAtIndex[0][tabIndexDefault[0]])
  } else if (urlMain === 'hobby' && urlSub === undefined) {
    history.pushState(null, null, '/hobby' + navItemsAtIndex[1][tabIndexDefault[1]])
  }

  // const [, params] = useRoute("/:main/:sub")
  // console.log(params)

//   return (
//   <>
//     <Route path="/about">about</Route>
//     <Route path="/hobby">hobby</Route>
//     <Route path="/about3">3</Route>
// 
//     <Link href="/about" onClick={() => triggerReRender({})}>
//       <a className="link">about</a>
//     </Link>
// 
//     <Link href="/hobby" onClick={() => triggerReRender({})}>
//       <a className="link">hobby</a>
//     </Link>
// 
//     <Link href="/about3" onClick={() => triggerReRender({})}>
//       <a className="link">Profile 3</a>
//     </Link>
//     <Redirect to='/about/whoIAm' />
//   </>
//   )

  if(willShowSafariPrompt){
    return <SafariWarning onclick={() => {willShowSafariPrompt = false; localStorage.setItem('will-skip-safari-prompt', 'true'); triggerReRender({})}} />
  } else {
    return (
    <>
      <main id='main' className='main'>
        {getBackground(theme.base)}
        <Canvas className='canvas' argumentCanvas={debouncedDimension} argumentDrawCanvas={{wavesConfig, waveColors}} aria-label='Background Wave' role='img' />

        {(currentIndex === 0 || currentIndex === 1) &&
        <NavBar navItemIndexOffset={[0, navItemsAtIndex[0].length]} tabIndexDefault={tabIndexDefault} level={currentIndex} baseURL={urlAtIndex[currentIndex]} items={navItemsAtIndex[currentIndex]} />
        }
        <Title index={currentIndex} />
        {currentIndex === 2 && <Contact />}
        <Content main={urlMain} sub={urlSub} />
        {/*{currentIndex < 2 && <Content test={navItemsAtIndex[currentIndex][tabIndexDefault[currentIndex]]} />}*/}
        {/*{routeResult !== null ? routeResult({}) : <NotFound />}*/}

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
