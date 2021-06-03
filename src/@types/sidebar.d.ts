declare module 'my-settings-type' {
  import {Updater} from 'use-immer'

  import {DuckColors} from 'my-duck-type'
  import {ThemeBase, ThemeProps, ThemeSupplement} from 'my-theme-type'
  import {Time} from 'my-time-type'
  import {TubesColors} from 'my-tube-type'
  import {WavesColors, WavesPhysics} from 'my-wave-config-type'

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
    duckColors: React.MutableRefObject<DuckColors>,

    theme: ThemeProps,
    setTheme: Updater<ThemeProps>,

    time: Time,
    setTime: Updater<Time>,

    tubeColors: React.MutableRefObject<TubesColors>,
    waveColors: React.MutableRefObject<WavesColors>,
    wavePhysics: WavesPhysics,
    setWavePhysics: Updater<WavesPhysics>,
  }
}
