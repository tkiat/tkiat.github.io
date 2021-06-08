import { Status } from 'my-util-type'

const get = (item: string) => localStorage.getItem(item) ?? 'rgb(0, 0, 0)'

const injectCustomTheme = (styleElem: HTMLStyleElement): Status => {
  if (!styleElem.sheet) return 1

  const getCustomStylesheet = () => {
    return `
    [theme-supplement='custom'] {
      --duck-beak-color:   ${get('--duck-beak-color')};
      --duck-body-color:   ${get('--duck-body-color')};
      --duck-wing-color:   ${get('--duck-wing-color')};
      --tube-stroke-color: ${get('--tube-stroke-color')};
      --tube-water-color:  ${get('--tube-water-color')};
      --wave-front0-color: ${get('--wave-front0-color')};
      --wave-front1-color: ${get('--wave-front1-color')};
      --wave-front2-color: ${get('--wave-front2-color')};
    }`
  }
  if (styleElem.sheet.cssRules[0]) styleElem.sheet.deleteRule(0)
  styleElem.sheet.insertRule(getCustomStylesheet(), 0)

  return 0
}

export default injectCustomTheme
