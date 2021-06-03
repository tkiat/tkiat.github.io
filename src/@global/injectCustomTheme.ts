const injectCustomTheme = (styleElem: HTMLStyleElement) => {
  if(!styleElem.sheet) return

  const getCustomStylesheet = () => {
    return `
    [theme-supplement='custom'] {
      --duck-beak-color:  ${localStorage.getItem('--duck-beak-color')   ?? 'rgb(0, 0, 0)'};
      --duck-body-color:  ${localStorage.getItem('--duck-body-color')   ?? 'rgb(0, 0, 0)'};
      --duck-wing-color:  ${localStorage.getItem('--duck-wing-color')   ?? 'rgb(0, 0, 0)'};
      --tube-stroke-color:${localStorage.getItem('--tube-stroke-color') ?? 'rgb(0, 0, 0)'};
      --tube-water-color: ${localStorage.getItem('--tube-water-color')  ?? 'rgb(0, 0, 0)'};
      --wave-front0-color:${localStorage.getItem('--wave-front0-color') ?? 'rgb(0, 0, 0)'};
      --wave-front1-color:${localStorage.getItem('--wave-front1-color') ?? 'rgb(0, 0, 0)'};
      --wave-front2-color:${localStorage.getItem('--wave-front2-color') ?? 'rgb(0, 0, 0)'};
    }`
  }
  if(styleElem.sheet.cssRules[0]) styleElem.sheet.deleteRule(0)
  styleElem.sheet.insertRule(getCustomStylesheet(), 0)
}

export default injectCustomTheme
