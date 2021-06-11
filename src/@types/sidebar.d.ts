declare module 'my-settings-type' {
  import { Updater } from 'use-immer'

  import { CustomColors, ThemeBase, ThemeProps, ThemeSupplement, Time, WaveColors, WavePhysics } from 'my-theme-type'

  export type BaseThemePickerProps = {
    current: ThemeBase
    setTheme: Updater<ThemeProps>
  }
  export type BaseThemePickerItemProps = BaseThemePickerProps & {
    base: ThemeBase
  }

  export type ThemePickerProps = {
    base: ThemeBase
    supplement: ThemeSupplement

    isActive: boolean
    setTheme: Updater<ThemeProps>
  }

  export type SidebarProps = {
    theme: ThemeProps
    setTheme: Updater<ThemeProps>

    time: Time
    setTime: Updater<Time>

    waveColors: React.MutableRefObject<WaveColors>
    wavePhysics: React.MutableRefObject<WavePhysics>

    customColors: React.MutableRefObject<CustomColors>
  }
}
