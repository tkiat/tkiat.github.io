declare module 'ts-type-sidebar' {
  import { Updater } from 'use-immer'

  import * as Theme from 'ts-type-theme'

  export type BaseThemePickerProps = {
    current: Theme.Base
    setTheme: Updater<Theme.Props>
  }
  export type BaseThemePickerItemProps = BaseThemePickerProps & {
    base: Theme.Base
  }

  export type ThemePickerProps = {
    base: Theme.Base
    supplement: Theme.Supplement

    isActive: boolean
    setTheme: Updater<Theme.Props>
  }

  export type SidebarProps = {
    theme: Theme.Props
    setTheme: Updater<Theme.Props>

    time: Theme.Time
    setTime: Updater<Theme.Time>

    waveColors: React.MutableRefObject<Theme.WaveColors>
    wavePhysics: React.MutableRefObject<Theme.WavePhysics>

    customColors: React.MutableRefObject<Theme.CustomColors>
  }
}
