import * as Theme from 'ts-type-theme'

import injectCustomColors from 'src/@global/injectCustomColors'
import * as ts from 'src/@global/utils-typescript'

export default (customColors: React.MutableRefObject<Theme.CustomColors>, variable: string, value: string) => {
  if (ts.isType(variable, ts.possible.customColors)) {
    customColors.current[variable] = value
    const customThemeElem = document.getElementById('theme-custom-supplement') as HTMLStyleElement
    injectCustomColors(customThemeElem, customColors.current)
  } else {
    console.error('custom color variable is not valid')
  }
}
