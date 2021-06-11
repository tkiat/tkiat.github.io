import * as Nav from 'ts-type-nav'
import * as Theme from 'ts-type-theme'

import * as ts from 'src/@global/utils-typescript'

export const navMainIndexInit = (() => {
  const fallback: Nav.NavMainIndex = 0
  const indexes: Nav.NavMainIndex[] = [0, 1, 2]

  const indexLocal = localStorage.getItem('nav-main-index')
  if (indexLocal === null) return fallback
  const index = parseInt(indexLocal)
  return ts.isType(index, indexes) ? index : fallback
})()

export const navSubIndexesInit: Nav.NavSubIndexes = {
  '0': parseInt(localStorage.getItem('nav-main-index0-sub-index') ?? '0'),
  '1': parseInt(localStorage.getItem('nav-main-index1-sub-index') ?? '0'),
  '2': null,
}

export const themeInit = (() => {
  const fallback: Extract<Theme.Base, Theme.Supplement> = 'sakura'

  const themesBase: Theme.Base[] = ['ocean', 'desert', 'sakura', 'snow']
  const themesSupplement: Theme.Supplement[] = ['ocean', 'desert', 'sakura', 'snow', 'custom']

  const themeBaseLocal = localStorage.getItem('theme-base')
  const themeSupplementLocal = localStorage.getItem('theme-supplement')
  const themeCustomBaseLocal = localStorage.getItem('theme-custom-base')
  return {
    base: ts.isType(themeBaseLocal, themesBase) ? themeBaseLocal : fallback,
    supplement: ts.isType(themeSupplementLocal, themesSupplement) ? themeSupplementLocal : fallback,
    'custom-base': ts.isType(themeCustomBaseLocal, themesBase) ? themeCustomBaseLocal : fallback,
  }
})()

export const timeInit = (() => {
  const fallback: Theme.Time = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'day'
  const times: Theme.Time[] = ['day', 'dark']

  const timeLocal = localStorage.getItem('time')
  return ts.isType(timeLocal, times) ? timeLocal : fallback
})()

export const wavePhysicsInit = (() => {
  const speedFallback = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '0' : '0.05'

  const heightInit = parseFloat(localStorage.getItem('wave-height') ?? '10')
  const speedInit = parseFloat(localStorage.getItem('wave-speed') ?? speedFallback)
  const shakinessInit = parseFloat(localStorage.getItem('wave-shakiness') ?? '0')
  return {
    height: heightInit,
    speed: speedInit,
    shakiness: shakinessInit,
  }
})()

export const isSafariBrowser = (() => {
  const userAgentString = navigator.userAgent
  const isSafariBrowserAgent = userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1
  return isSafariBrowserAgent && localStorage.getItem('will-skip-safari-prompt') !== 'true'
})()

type UrlMain = {
  [k in Nav.NavMainIndex]: string
}
type UrlSub = {
  [k in Nav.NavMainIndex]: string[]
}
export const urls: { main: UrlMain; sub: UrlSub } = {
  main: {
    0: '/about',
    1: '/hobby',
    2: '/resume',
  },
  sub: {
    0: ['/Intro', '/Personality', '/Record', '/Credits'],
    1: ['/Web', '/PC', '/Environment', '/Others'],
    2: [],
  },
}
