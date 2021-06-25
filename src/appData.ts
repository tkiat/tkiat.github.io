import * as Nav from 'ts-type-nav'
import * as Theme from 'ts-type-theme'

import * as ts from 'src/@global/utils-typescript'

const getIsSafariBrowser = () => {
  const userAgentString = navigator.userAgent
  const isSafariBrowserAgent = userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1
  return isSafariBrowserAgent && localStorage.getItem('will-skip-safari-prompt') !== 'true'
}

const getNavMainIndexInit = () => {
  const fallback = 0
  const index = parseInt(localStorage.getItem('nav-main-index') ?? fallback.toString())
  return ts.isType(index, ts.possible.navMainIndexes) ? index : fallback
}

const getThemeInit = () => {
  const fallback: Extract<Theme.Base, Theme.Supplement> = 'sakura'

  const themeBaseLocal = localStorage.getItem('theme-base')
  const themeSupplementLocal = localStorage.getItem('theme-supplement')
  const themeCustomBaseLocal = localStorage.getItem('theme-custom-base')
  return {
    base: ts.isType(themeBaseLocal, ts.possible.themesBase) ? themeBaseLocal : fallback,
    supplement: ts.isType(themeSupplementLocal, ts.possible.themesSupplement) ? themeSupplementLocal : fallback,
    'custom-base': ts.isType(themeCustomBaseLocal, ts.possible.themesBase) ? themeCustomBaseLocal : fallback,
  }
}

const getTimeInit = () => {
  const fallback: Theme.Time = window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'day'
  const timeLocal = localStorage.getItem('time')
  return ts.isType(timeLocal, ts.possible.times) ? timeLocal : fallback
}

const getWavePhysicsInit = () => {
  const speedFallback = window && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '0' : '0.05'

  const heightInit = parseFloat(localStorage.getItem('wave-height') ?? '10')
  const speedInit = parseFloat(localStorage.getItem('wave-speed') ?? speedFallback)
  const shakinessInit = parseFloat(localStorage.getItem('wave-shakiness') ?? '0')
  return {
    height: heightInit,
    speed: speedInit,
    shakiness: shakinessInit,
  }
}

const urls = {
  main: {
    0: '/about',
    1: '/activity',
    2: '/resume',
  },
  sub: {
    0: ['/Intro', '/Personality', '/Items', '/Credits'],
    1: ['/Software', '/General', '/Biography'],
  },
}
const paths = [
  urls.main[0] + urls.sub[0][0],
  urls.main[0] + urls.sub[0][1],
  urls.main[0] + urls.sub[0][2],
  urls.main[0] + urls.sub[0][3],

  urls.main[1] + urls.sub[1][0],
  urls.main[1] + urls.sub[1][1],
  urls.main[1] + urls.sub[1][2],

  urls.main[2],
]

type Model = {
  isSafariBrowser: boolean
  navMainIndexInit: Nav.NavMainIndex
  navSubIndexesInit: Nav.NavSubIndexes
  paths: string[]
  themeInit: Theme.Props
  timeInit: Theme.Time
  urls: Nav.Url
  wavePhysicsInit: Theme.WavePhysics
}

const initData: Model = {
  isSafariBrowser: getIsSafariBrowser(),
  navMainIndexInit: getNavMainIndexInit(),
  navSubIndexesInit: {
    '0': parseInt(localStorage.getItem('nav-main-index0-sub-index') ?? '0'),
    '1': parseInt(localStorage.getItem('nav-main-index1-sub-index') ?? '0'),
  },
  paths: paths,
  themeInit: getThemeInit(),
  timeInit: getTimeInit(),
  urls: urls,
  wavePhysicsInit: getWavePhysicsInit(),
}

export default initData
