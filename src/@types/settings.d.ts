declare module 'my-settings-type' {
  import {Updater} from 'use-immer'
  import {ThemeBase, ThemeSupplement, ThemeProps} from 'my-theme-type'
  import {WavesColors, WavesPhysics} from 'my-wave-config-type'
  import {DucksColors} from 'my-duck-type'
  import {Time} from 'my-time-type'
  import {TubesColors} from 'my-tube-type'

  export type BaseThemePickerProps = {
    current: ThemeBase,
    setTheme: Updater<ThemeProps>,
  }
  export type BaseThemePickerItemProps = BaseThemePickerProps & {
    base: ThemeBase,
  }

  export type ThemePickerProps = {
    base: ThemeBase,
    supplement: ThemeSupplement

    isActive: boolean,
    setTheme: Updater<ThemeProps>,
  }

  export type SidebarProps = {
    duckColors: React.MutableRefObject<DucksColors>,
    getCustomStylesheet: () => string,
    theme: ThemeProps,
    setTheme: Updater<ThemeProps>,
    time: Time,
    setTime: Updater<Time>,
    toggleSidebar: () => void,
    tubeColors: React.MutableRefObject<TubesColors>,
    waveColors: React.MutableRefObject<WavesColors>,
    wavePhysics: WavesPhysics,
    setWavePhysics: Updater<WavesPhysics>,
  }
}
