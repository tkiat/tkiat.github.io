import { Status } from 'my-util-type'

const injectCustomTheme = (styleElem: HTMLStyleElement, customThemeObj: { [k: string]: string }): Status => {
  if (!styleElem.sheet) return 1

  const customStyle =
    Object.entries(customThemeObj).reduce(
      (sofar, entry) => sofar + '--' + entry[0] + ':' + entry[1] + ';',
      '[theme-supplement="custom"] {'
    ) + '}'

  if (styleElem.sheet.cssRules[0]) styleElem.sheet.deleteRule(0)
  styleElem.sheet.insertRule(customStyle, 0)

  return 0
}

export default injectCustomTheme
