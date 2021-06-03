import { ThemeBase, ThemeSupplement } from 'my-theme-type'
import { Time } from 'my-time-type'

const initialThemes = (() => {
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

const initialTime = (() => {
  const isTime = (time: string | null): time is Time => {
    const times: Time[] = ['day', 'dark']
    return times.includes(time as Time)
  }

  const timeFallback: Time = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'day'
  const local = localStorage.getItem('time')
  return isTime(local) ? local : timeFallback
})()

const isSafariBrowser = (() => {
  const userAgentString = navigator.userAgent
  const isSafariBrowserAgent = userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1
  return isSafariBrowserAgent && localStorage.getItem('will-skip-safari-prompt') !== 'true'
})()

export { initialThemes, initialTime, isSafariBrowser }
