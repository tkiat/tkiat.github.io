import * as Nav from 'ts-type-nav'
import * as Theme from 'ts-type-theme'

export const isType = <T>(subject: unknown, possibleValues: T[]): subject is T => {
  return possibleValues.includes(subject as T)
}

// possible values of each type
const customColors: (keyof Theme.CustomColors)[] = [
  'duck-beak',
  'duck-body',
  'duck-wing',
  'tube-stroke',
  'tube-water',
  'wave-front0',
  'wave-front1',
  'wave-front2',
]
const navMainIndexes: Nav.NavMainIndex[] = [0, 1, 2]
const navSubIndexes: Extract<Nav.NavMainIndex, 0 | 1>[] = [0, 1]
const themesBase: Theme.Base[] = ['ocean', 'desert', 'sakura', 'snow']
const themesSupplement: Theme.Supplement[] = ['ocean', 'desert', 'sakura', 'snow', 'custom']
const times: Theme.Time[] = ['day', 'dark']
export const possible = {
  customColors,
  navMainIndexes,
  navSubIndexes,
  themesBase,
  themesSupplement,
  times,
}
