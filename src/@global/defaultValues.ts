import { Level } from 'my-nav-type'
import { ThemeBase, ThemeSupplement, Time } from 'my-theme-type'

export const initialThemes = (() => {
  const isBaseTheme = (theme: string | null): theme is ThemeBase => {
    const themes: ThemeBase[] = ['ocean', 'desert', 'sakura', 'snow']
    return themes.includes(theme as ThemeBase)
  }
  const isSupplementTheme = (theme: string | null): theme is ThemeSupplement => {
    const themes: ThemeSupplement[] = ['ocean', 'desert', 'sakura', 'snow', 'custom']
    return themes.includes(theme as ThemeSupplement)
  }

  const themeFallback: ThemeBase = 'sakura'

  const localBase = localStorage.getItem('theme-base')
  const localSupplement = localStorage.getItem('theme-supplement')
  const localCustomBase = localStorage.getItem('theme-custom-base')
  return {
    base: isBaseTheme(localBase) ? localBase : themeFallback,
    supplement: isSupplementTheme(localSupplement) ? localSupplement : themeFallback,
    'custom-base': isBaseTheme(localCustomBase) ? localCustomBase : themeFallback,
  }
})()

export const initialTime = (() => {
  const isTime = (time: string | null): time is Time => {
    const times: Time[] = ['day', 'dark']
    return times.includes(time as Time)
  }

  const timeFallback: Time = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'day'
  const local = localStorage.getItem('time')
  return isTime(local) ? local : timeFallback
})()

export const isSafariBrowser = (() => {
  const userAgentString = navigator.userAgent
  const isSafariBrowserAgent = userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1
  return isSafariBrowserAgent && localStorage.getItem('will-skip-safari-prompt') !== 'true'
})()

type UrlMain = {
  [k in Level]: string
}
type UrlSub = {
  [k in Level]: string[]
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
