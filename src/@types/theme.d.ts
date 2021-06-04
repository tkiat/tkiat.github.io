declare module 'my-theme-type' {
  export type ThemeBase = 'ocean' | 'desert' | 'sakura' | 'snow'
  export type ThemeSupplement = ThemeBase | 'custom'
  export type ThemeProps = {
    base: ThemeBase
    supplement: ThemeSupplement
    'custom-base': ThemeBase
  }

  export type Time = 'day' | 'dark'

  export type DuckColors = {
    beak: string
    body: string
    wing: string
  }
  export type TubesColors = {
    stroke: string
    water: string
  }
}
